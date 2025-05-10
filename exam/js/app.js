let currentQuestionIndex = 0;
let questions = [];
let userAnswers = [];

const userSession = {
    answers: {},
    currentScore: 0,
    totalQuestions: 0
};

// DOM Elements
const questionTextElem = document.getElementById('question-text-p');
const optionsContainer = document.getElementById('answer-options');
const feedbackArea = document.getElementById('feedback-area');
const feedbackCorrectness = document.getElementById('feedback-correctness');
const feedbackUserAnswer = document.getElementById('feedback-user-answer');
const feedbackCorrectAnswer = document.getElementById('feedback-correct-answer');
const feedbackExplanation = document.getElementById('feedback-explanation');
const prevButton = document.getElementById('prev-question-btn');
const nextButton = document.getElementById('next-question-btn');
const submitButton = document.getElementById('submit-answer-btn');
const questionCounterElem = document.getElementById('question-counter');

// --- Initialization ---
async function initializeDemo() {
    try {
        const response = await fetch('js/questions.js');
        const scriptContent = await response.text();
        const script = document.createElement('script');
        script.textContent = scriptContent;
        document.head.appendChild(script);

        questions = window.questionsData || [];
        if (!questions.length) {
            feedbackArea.classList.remove('hidden');
            feedbackArea.innerHTML = "<p>Error: No questions loaded.</p>";
            return;
        }

        userSession.totalQuestions = questions.length;
        loadQuestion(currentQuestionIndex);
    } catch (error) {
        feedbackArea.classList.remove('hidden');
        feedbackArea.innerHTML = `<p>Error loading questions: ${error.message}</p>`;
    }
}

// --- Event Listeners ---
submitButton.addEventListener('click', handleSubmitAnswer);
prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

// --- Load Question ---
function loadQuestion(index) {
    const question = questions[index];
    questionTextElem.textContent = question.questionText;
    optionsContainer.innerHTML = '';

    const inputType = question.questionType === 'multipleChoiceMultiple' ? 'checkbox' : 'radio';

    question.options.forEach((opt, i) => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = inputType;
        input.name = 'answer';
        input.id = `q${index}_opt${i}`;
        input.value = opt.id;

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = opt.text;

        li.appendChild(input);
        li.appendChild(label);
        optionsContainer.appendChild(li);
    });

    questionCounterElem.textContent = `Question ${index + 1} of ${questions.length}`;
    feedbackArea.classList.add('hidden');
    submitButton.disabled = false;
    updateNavigationButtons();
}

// --- Submit Answer ---
function handleSubmitAnswer() {
    const question = questions[currentQuestionIndex];
    const selected = Array.from(optionsContainer.querySelectorAll('input[name="answer"]:checked')).map(i => i.value);

    if (!selected.length) {
        alert('Please select an answer.');
        return;
    }

    const isCorrect = arraysMatch(selected, question.correctAnswer);
    userAnswers[currentQuestionIndex] = {
        questionId: question.id,
        answer: selected,
        attempted: true,
        correct: isCorrect
    };

    displayFeedback(isCorrect, selected, question.correctAnswer, question.explanation);
    submitButton.disabled = true;
    updateNavigationButtons();
}

// --- Feedback ---
function displayFeedback(isCorrect, userAnswer, correctAnswer, explanation) {
    feedbackCorrectness.textContent = isCorrect ? "Correct!" : "Incorrect.";
    feedbackCorrectness.style.color = isCorrect ? "green" : "red";

    feedbackUserAnswer.textContent = userAnswer.join(', ');
    feedbackCorrectAnswer.textContent = correctAnswer.join(', ');
    feedbackExplanation.textContent = explanation || "No explanation provided.";

    feedbackArea.classList.remove('hidden');
}

// --- Navigation Buttons ---
function updateNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0;
    const answered = userAnswers[currentQuestionIndex]?.attempted;
    nextButton.disabled = !answered || currentQuestionIndex >= questions.length - 1;
}

// --- Helpers ---
function arraysMatch(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every(val => arr2.includes(val));
}

// --- Load Initial ---
document.addEventListener('DOMContentLoaded', () => {
    initializeDemo();
});
