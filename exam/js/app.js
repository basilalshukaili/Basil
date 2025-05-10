let currentQuestionIndex = 0;
let userSession = {
    answers: {},
    currentScore: 0,
    totalQuestions: 0
};

let userAnswers = []; // Track user's answers per question

// DOM Elements
const questionTextElem = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackArea = document.getElementById('feedback-area');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const questionCounterElem = document.getElementById('question-counter');

// --- Initialization ---
async function initializeDemo() {
    try {
        const response = await fetch('questions.js');
        if (!response.ok) {
            throw new Error(`Failed to load questions: ${response.status}`);
        }

        const scriptContent = await response.text();
        const script = document.createElement('script');
        script.textContent = scriptContent;
        document.head.appendChild(script);

        const questionsData = window.questionsData || [];

        if (questionsData.length === 0) {
            console.error("No questions loaded. Check questions.js file and path.");
            feedbackArea.innerHTML = "<p>Error: Could not load questions. Please check the console.</p>";
            feedbackArea.style.display = 'block';
            return;
        }

        userSession.totalQuestions = questionsData.length;
        window.appQuestions = questionsData; // store in global scope
        loadQuestion(currentQuestionIndex);
    } catch (error) {
        console.error("Error initializing demo:", error);
        feedbackArea.innerHTML = `<p>Error initializing application: ${error.message}. Please check the console for more details.</p>`;
        feedbackArea.style.display = 'block';
    }
}

// --- Event Listeners ---
prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < window.appQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

submitButton.addEventListener('click', handleSubmitAnswer);

// --- Core Logic ---
function loadQuestion(index) {
    const questions = window.appQuestions;
    if (index < 0 || index >= questions.length) return;
    const question = questions[index];

    questionTextElem.textContent = question.questionText;
    optionsContainer.innerHTML = '';

    question.options.forEach((opt, optIndex) => {
        const li = document.createElement('li');
        const inputType = question.questionType === 'multipleChoiceMultiple' ? 'checkbox' : 'radio';
        const input = document.createElement('input');
        input.type = inputType;
        input.name = 'answer';
        input.id = `q${index}_opt${optIndex}`;
        input.value = opt.id;

        const label = document.createElement('label');
        label.htmlFor = `q${index}_opt${optIndex}`;
        label.textContent = opt.text;

        li.appendChild(input);
        li.appendChild(label);
        optionsContainer.appendChild(li);
    });

    questionCounterElem.textContent = `Question ${index + 1} of ${questions.length}`;
    updateNavigationButtons();
    feedbackArea.style.display = 'none';
    submitButton.disabled = false;
}

function handleSubmitAnswer() {
    const questions = window.appQuestions;
    const currentQ = questions[currentQuestionIndex];
    const selectedOptions = Array.from(optionsContainer.querySelectorAll('input[name="answer"]:checked')).map(input => input.value);

    if (selectedOptions.length === 0 &&
        (currentQ.questionType === 'multipleChoiceSingle' || currentQ.questionType === 'multipleChoiceMultiple')) {
        alert('Please select an answer.');
        return;
    }

    userAnswers[currentQuestionIndex] = {
        questionId: currentQ.id,
        answer: selectedOptions,
        attempted: true
    };

    let isCorrect = false;
    if (currentQ.correctAnswer.length === selectedOptions.length &&
        currentQ.correctAnswer.every(val => selectedOptions.includes(val))) {
        isCorrect = true;
    }

    displayFeedback(isCorrect, currentQ.correctAnswer, currentQ.explanation);
    submitButton.disabled = true;
    nextButton.disabled = currentQuestionIndex === questions.length - 1;
}

function displayFeedback(isCorrect, correctAnswer, explanation) {
    feedbackArea.innerHTML = '';

    const correctness = document.createElement('h3');
    correctness.textContent = isCorrect ? 'Correct!' : 'Incorrect.';
    correctness.style.color = isCorrect ? 'green' : 'red';

    const correctAnswerDisplay = document.createElement('p');
    correctAnswerDisplay.innerHTML = `<strong>Correct Answer(s):</strong> ${correctAnswer.join(', ')}`;

    const explanationDisplay = document.createElement('p');
    explanationDisplay.innerHTML = `<strong>Explanation:</strong> ${explanation || 'N/A'}`;

    feedbackArea.appendChild(correctness);
    feedbackArea.appendChild(correctAnswerDisplay);
    feedbackArea.appendChild(explanationDisplay);
    feedbackArea.style.display = 'block';
}

function updateNavigationButtons() {
    const questions = window.appQuestions;
    prevButton.disabled = currentQuestionIndex === 0;
    const currentAnswerData = userAnswers[currentQuestionIndex];
    if (currentAnswerData && currentAnswerData.attempted) {
        nextButton.disabled = currentQuestionIndex === questions.length - 1;
    } else {
        nextButton.disabled = true;
    }
}

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    initializeDemo();
});
