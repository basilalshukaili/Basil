// app.js - Main application logic for Security+ Interactive Learning Demo

// Application State
let currentQuestionIndex = 0;
let questions = []; // Loaded from questions.js
let userAnswers = []; // Initialize as an array to store answers for each question

// DOM Elements from index.html
const welcomeScreen = document.getElementById("welcome-screen");
const learningInterface = document.getElementById("learning-interface");
const summaryPage = document.getElementById("summary-page");

const startDemoBtn = document.getElementById("start-demo-btn");
const questionCounterElem = document.getElementById("question-counter");
const exhibitArea = document.getElementById("exhibit-area");
const exhibitImage = document.getElementById("exhibit-image");
const exhibitTextElem = document.getElementById("exhibit-text");
const questionTextPElem = document.getElementById("question-text-p"); // Corrected ID from question-text to question-text-p
const answerOptionsContainer = document.getElementById("answer-options"); // Corrected ID from options-container to answer-options
const pbqInteractionArea = document.getElementById("pbq-interaction-area");
const submitAnswerBtn = document.getElementById("submit-answer-btn"); // Corrected ID from submit-btn to submit-answer-btn
const feedbackArea = document.getElementById("feedback-area");
const feedbackCorrectness = document.getElementById("feedback-correctness");
const feedbackUserAnswer = document.getElementById("feedback-user-answer");
const feedbackCorrectAnswer = document.getElementById("feedback-correct-answer");
const feedbackExplanation = document.getElementById("feedback-explanation");
const prevQuestionBtn = document.getElementById("prev-question-btn"); // Corrected ID from prev-btn to prev-question-btn
const nextQuestionBtn = document.getElementById("next-question-btn"); // Corrected ID from next-btn to next-question-btn
const endSessionBtn = document.getElementById("end-session-btn");
const restartDemoBtn = document.getElementById("restart-demo-btn");
const summaryDetails = document.getElementById("summary-details");

// --- Initialization ---
async function initializeDemo() {
    try {
        // questions.js is already included via <script> tag in HTML, so `questions` global variable should be available.
        if (typeof questions === "undefined" || questions.length === 0) {
            console.error("Questions array not found or empty. Ensure questions.js is loaded and defines the 'questions' array globally.");
            feedbackArea.innerHTML = "<p>Error: Could not load questions. Please check the console.</p>";
            feedbackArea.style.display = "block";
            return;
        }

        userAnswers = new Array(questions.length).fill(null).map(() => ({ attempted: false, answer: [], isCorrect: null, flagged: false }));
        currentQuestionIndex = 0;
        UI.showScreen("welcome"); // Use UI module to show screens
    } catch (error) {
        console.error("Error initializing demo:", error);
        if(feedbackArea) {
            feedbackArea.innerHTML = `<p>Error initializing application: ${error.message}. Please check the console for more details.</p>`;
            feedbackArea.style.display = "block";
        }
    }
}

// --- Event Listeners ---
startDemoBtn.addEventListener("click", () => {
    UI.showScreen("learning");
    loadQuestion(currentQuestionIndex);
});

prevQuestionBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

nextQuestionBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

submitAnswerBtn.addEventListener("click", handleSubmitAnswer);

endSessionBtn.addEventListener("click", () => {
    UI.renderResultsPage(calculateResults(), questions, userAnswers);
    UI.showScreen("summary");
});

restartDemoBtn.addEventListener("click", () => {
    initializeDemo(); // Re-initialize to reset state
});


// --- Core Logic ---
function loadQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    const question = questions[index];
    const userAnswerData = userAnswers[index];
    UI.renderQuestion(question, userAnswerData); // Use UI module to render
    updateNavigationButtons();
    feedbackArea.style.display = userAnswerData && userAnswerData.attempted ? "block" : "none";
    if (userAnswerData && userAnswerData.attempted) {
        displayFeedback(userAnswerData.isCorrect, question.correctAnswer, userAnswerData.answer, question.explanation);
    }
    submitAnswerBtn.disabled = userAnswerData && userAnswerData.attempted;
}

function handleSubmitAnswer() {
    const currentQ = questions[currentQuestionIndex];
    const selectedAnswer = UI.getUserAnswer(currentQ); // Get answer via UI module

    if (selectedAnswer.length === 0 && (currentQ.questionType === "multipleChoiceSingle" || currentQ.questionType === "multipleChoiceMultiple" || currentQ.questionType === "fillInTheBlank" || currentQ.questionType === "pbqLogAnalysis")) {
        alert("Please select or provide an answer.");
        return;
    }

    userAnswers[currentQuestionIndex].answer = selectedAnswer;
    userAnswers[currentQuestionIndex].attempted = true;

    let isCorrect = false;
    if (currentQ.questionType === "dragAndDrop") {
        // For drag and drop, selectedAnswer[0] is the mapping object
        const userMapping = selectedAnswer[0] || {};
        const correctMapping = currentQ.pbqData.correctMapping;
        isCorrect = Object.keys(correctMapping).length === Object.keys(userMapping).length && 
                    Object.keys(correctMapping).every(key => correctMapping[key] === userMapping[key]);
    } else if (currentQ.questionType === "pbqLogAnalysis") {
        isCorrect = selectedAnswer.length > 0 && parseInt(selectedAnswer[0]) === currentQ.pbqData.correctLineNumber;
    } else if (currentQ.questionType === "pbqFirewallConfig") {
        // For firewall config, selectedAnswer is an array of inputs
        // Compare with currentQ.correctAnswer which should also be an array in the same order
        isCorrect = currentQ.correctAnswer.length === selectedAnswer.length && 
                    currentQ.correctAnswer.every((val, i) => String(val).toLowerCase() === String(selectedAnswer[i]).toLowerCase());
    } else { // For MCQ, FillInTheBlank
        isCorrect = currentQ.correctAnswer.length === selectedAnswer.length &&
                    currentQ.correctAnswer.every(val => selectedAnswer.map(sa => String(sa).toLowerCase()).includes(String(val).toLowerCase()));
    }
    
    userAnswers[currentQuestionIndex].isCorrect = isCorrect;

    displayFeedback(isCorrect, currentQ.correctAnswer, selectedAnswer, currentQ.explanation);
    submitAnswerBtn.disabled = true;
    updateNavigationButtons();
}

function displayFeedback(isCorrect, correctAnswer, userAnswer, explanation) {
    feedbackCorrectness.textContent = isCorrect ? "Correct!" : "Incorrect.";
    feedbackCorrectness.style.color = isCorrect ? "green" : "red";
    
    let userAnswerText = Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer;
    if (typeof userAnswer === "object" && !Array.isArray(userAnswer) && userAnswer !== null) {
        userAnswerText = JSON.stringify(userAnswer);
    }

    feedbackUserAnswer.textContent = userAnswerText || "No answer provided";
    feedbackCorrectAnswer.textContent = Array.isArray(correctAnswer) ? correctAnswer.join(", ") : correctAnswer;
    feedbackExplanation.textContent = explanation || "N/A";
    feedbackArea.style.display = "block";
}

function updateNavigationButtons() {
    prevQuestionBtn.disabled = currentQuestionIndex === 0;
    const currentAttempt = userAnswers[currentQuestionIndex];
    nextQuestionBtn.disabled = !(currentAttempt && currentAttempt.attempted) || currentQuestionIndex === questions.length - 1;
}

function calculateResults() {
    let correctCount = 0;
    const domainScores = {};

    questions.forEach((q, index) => {
        if (userAnswers[index] && userAnswers[index].isCorrect) {
            correctCount++;
        }
        const domain = q.domain;
        if (!domainScores[domain]) {
            domainScores[domain] = { correct: 0, total: 0 };
        }
        domainScores[domain].total++;
        if (userAnswers[index] && userAnswers[index].isCorrect) {
            domainScores[domain].correct++;
        }
    });

    const overallScore = questions.length > 0 ? ((correctCount / questions.length) * 100).toFixed(2) + "%" : "0%";
    // No pass/fail status for a learning demo
    return { overallScore, domainScores, passFailStatus: "-" }; 
}


// --- Initial Load ---
document.addEventListener("DOMContentLoaded", initializeDemo);

