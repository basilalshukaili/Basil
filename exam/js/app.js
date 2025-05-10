```javascript
// app.js - Main application logic for Security+ Interactive Learning Demo

// Application State
let currentQuestionIndex = 0;
let questions = []; // Loaded from questions.js
let userSession = {
    answers: {},
    currentScore: 0,
    totalQuestions: 0
};

// DOM Elements (assuming these are defined in your HTML)
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
        const response = await fetch('questions.js'); // Assuming questions.js is in the same directory
        if (!response.ok) {
            throw new Error(`Failed to load questions: ${response.status}`);
        }
        const scriptContent = await response.text();
        // This is a simplified way to get questions. In a real app, you might use a module loader or other methods.
        // For this example, we'll assume questions.js defines a global 'questionsData' array.
        // Make sure your questions.js file sets `window.questionsData = [...]`
        const script = document.createElement('script');
        script.textContent = scriptContent;
        document.head.appendChild(script);
        questions = window.questionsData || [];

        if (questions.length === 0) {
            console.error("No questions loaded. Check questions.js file and path.");
            feedbackArea.innerHTML = "<p>Error: Could not load questions. Please check the console.</p>";
            feedbackArea.style.display = 'block';
            return;
        }

        userSession.totalQuestions = questions.length;
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
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

submitButton.addEventListener('click', handleSubmitAnswer);

// --- Core Logic ---
function loadQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    const question = questions[index];
    questionTextElem.textContent = question.questionText;
    optionsContainer.innerHTML = ''; // Clear previous options

    question.options.forEach((opt, optIndex) => {
        const li = document.createElement('li');
        const inputType = question.questionType === 'multipleChoiceMultiple' ? 'checkbox' : 'radio';
        const input = document.createElement('input');
        input.type = inputType;
        input.name = 'answer';
        input.id = `q${index}_opt${optIndex}`;
        input.value = opt.id; // Assuming options have an 'id' property for their value

        const label = document.createElement('label');
        label.htmlFor = `q${index}_opt${optIndex}`;
        label.textContent = opt.text;

        li.appendChild(input);
        li.appendChild(label);
        optionsContainer.appendChild(li);
    });

    updateNavigationButtons();
    feedbackArea.style.display = 'none'; // Hide feedback when new question loads
    submitButton.disabled = false; // Enable submit for new question
}

function handleSubmitAnswer() {
    const currentQ = questions[currentQuestionIndex];
    const selectedOptions = Array.from(optionsContainer.querySelectorAll('input[name="answer"]:checked'))
                                .map(input => input.value);

    if (selectedOptions.length === 0 && (currentQ.questionType === 'multipleChoiceSingle' || currentQ.questionType === 'multipleChoiceMultiple')) {
        alert('Please select an answer.');
        return;
    }

    // Store user's answer
    userAnswers[currentQuestionIndex] = {
        questionId: currentQ.id,
        answer: selectedOptions
    };

    // Check answer
    let isCorrect = false;
    if (currentQ.correctAnswer.length === selectedOptions.length && 
        currentQ.correctAnswer.every(val => selectedOptions.includes(val))) {
        isCorrect = true;
    }

    displayFeedback(isCorrect, currentQ.correctAnswer, currentQ.explanation);
    submitButton.disabled = true; // Disable submit after answering
    nextButton.disabled = currentQuestionIndex === questions.length - 1;
}

function displayFeedback(isCorrect, correctAnswer, explanation) {
    feedbackArea.innerHTML = ''; // Clear previous feedback
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
    prevButton.disabled = currentQuestionIndex === 0;
    // Next button is enabled only if the current question has been answered OR it's not the last question
    const currentAnswerData = userAnswers.find(ua => ua && ua.questionId === questions[currentQuestionIndex].id);
    if (currentAnswerData && currentAnswerData.attempted) {
        nextButton.disabled = currentQuestionIndex === questions.length - 1;
    } else {
        nextButton.disabled = true; // Disable if not answered yet
    }
}

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Ensure questions.js is loaded and UI is ready
    if (typeof questions !== 'undefined' && questions.length > 0) {
        initializeDemo();
    } else {
        // Fallback or error handling if questions are not loaded
        console.error("Questions not loaded. Make sure questions.js is included and defines 'questions' array.");
        document.body.innerHTML = "<p>Error loading questions. Please check the console.</p>";
    }
});

