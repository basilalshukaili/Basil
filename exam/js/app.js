// app.js - Main application logic for Security+ Exam Demo

// Application State
let currentQuestionIndex = 0;
let userAnswers = []; // To store user's answers, e.g., [{ questionId: 1, answer: ["a"], flagged: false }]
let examStartTime;
let timerInterval;
const EXAM_DURATION_MINUTES = 90;
let timeLeft = EXAM_DURATION_MINUTES * 60; // in seconds

// DOM Elements (from ui.js, but defined here for app.js logic)
const welcomeScreen = document.getElementById("welcome-screen");
const examInterface = document.getElementById("exam-interface");
const reviewPage = document.getElementById("review-page");
const resultsPage = document.getElementById("results-page");

const startExamBtn = document.getElementById("start-exam-btn");
const nextQuestionBtn = document.getElementById("next-question-btn");
const prevQuestionBtn = document.getElementById("prev-question-btn");
const flagReviewBtn = document.getElementById("flag-review-btn");
const reviewAllBtn = document.getElementById("review-all-btn");
const submitFinalBtn = document.getElementById("submit-final-btn");
const backToExamBtn = document.getElementById("back-to-exam-btn");
const reviewAnswersDetailedBtn = document.getElementById("review-answers-detailed-btn");
const restartExamBtn = document.getElementById("restart-exam-btn");

// --- Initialization ---
function initializeExam() {
    currentQuestionIndex = 0;
    userAnswers = questions.map(q => ({ questionId: q.id, answer: [], flagged: false, answered: false }));
    timeLeft = EXAM_DURATION_MINUTES * 60;
    updateTimerDisplay();
    UI.showScreen("welcome");
}

// --- Event Listeners ---
startExamBtn.addEventListener("click", startExam);
nextQuestionBtn.addEventListener("click", showNextQuestion);
prevQuestionBtn.addEventListener("click", showPreviousQuestion);
flagReviewBtn.addEventListener("click", toggleFlagQuestion);
reviewAllBtn.addEventListener("click", showReviewPage);
submitFinalBtn.addEventListener("click", submitExam);
backToExamBtn.addEventListener("click", () => UI.showScreen("exam"));
reviewAnswersDetailedBtn.addEventListener("click", showDetailedReview);
restartExamBtn.addEventListener("click", initializeExam);

// --- Exam Flow Functions ---
function startExam() {
    examStartTime = new Date();
    startTimer();
    loadQuestion(currentQuestionIndex);
    UI.showScreen("exam");
}

function loadQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    currentQuestionIndex = index;
    const question = questions[index];
    const userAnswerData = userAnswers.find(ua => ua.questionId === question.id);
    UI.renderQuestion(question, userAnswerData);
    updateNavigationButtons();
    updateFlagButtonState(userAnswerData ? userAnswerData.flagged : false);
}

function showNextQuestion() {
    saveCurrentAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

function showPreviousQuestion() {
    saveCurrentAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function updateNavigationButtons() {
    prevQuestionBtn.disabled = currentQuestionIndex === 0;
    nextQuestionBtn.disabled = currentQuestionIndex === questions.length - 1;
    if (currentQuestionIndex === questions.length - 1) {
        nextQuestionBtn.textContent = "Finish"; // Or change to review
    } else {
        nextQuestionBtn.textContent = "Next";
    }
}

function toggleFlagQuestion() {
    const question = questions[currentQuestionIndex];
    const userAnswerData = userAnswers.find(ua => ua.questionId === question.id);
    if (userAnswerData) {
        userAnswerData.flagged = !userAnswerData.flagged;
        updateFlagButtonState(userAnswerData.flagged);
    }
}

function updateFlagButtonState(isFlagged) {
    flagReviewBtn.textContent = isFlagged ? "Unflag Question" : "Flag for Review";
    flagReviewBtn.style.backgroundColor = isFlagged ? "#f0ad4e" : ""; // Example style change
}

function saveCurrentAnswer() {
    const question = questions[currentQuestionIndex];
    const userAnswerData = userAnswers.find(ua => ua.questionId === question.id);
    if (!userAnswerData) return;

    const answer = UI.getUserAnswer(question);
    userAnswerData.answer = answer;
    userAnswerData.answered = answer && answer.length > 0; // Basic check, PBQs might need more complex logic
}

// --- Timer Functions ---
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
            submitExam(); 
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// --- Review and Submission ---
function showReviewPage() {
    saveCurrentAnswer(); // Save answer of the current question before going to review
    UI.renderReviewPage(questions, userAnswers);
    UI.showScreen("review");
}

function submitExam() {
    clearInterval(timerInterval);
    saveCurrentAnswer(); // Ensure last question answer is saved
    const results = calculateResults();
    UI.renderResultsPage(results, questions, userAnswers);
    UI.showScreen("results");
}

function calculateResults() {
    let correctCount = 0;
    let domainScores = {};

    questions.forEach(q => {
        const userAnswerEntry = userAnswers.find(ua => ua.questionId === q.id);
        if (!userAnswerEntry) return;

        let isCorrect = false;
        if (q.questionType === "multipleChoiceSingle" || q.questionType === "fillInTheBlank" || q.questionType === "exhibit") {
            isCorrect = userAnswerEntry.answer.length === 1 && q.correctAnswer.includes(userAnswerEntry.answer[0].toLowerCase());
        } else if (q.questionType === "multipleChoiceMultiple") {
            isCorrect = q.correctAnswer.length === userAnswerEntry.answer.length && 
                        q.correctAnswer.every(ca => userAnswerEntry.answer.includes(ca));
        } else if (q.questionType === "pbqLogAnalysis") {
             // Assuming answer is stored as a single string for the line number
            isCorrect = userAnswerEntry.answer.length === 1 && q.correctAnswer.includes(userAnswerEntry.answer[0]);
        } else if (q.questionType === "dragAndDrop" || q.questionType === "pbqFirewallConfig") {
            // PBQ scoring is more complex and would typically be handled by specific functions
            // For now, let's assume a simplified check or mark as needs manual review / placeholder
            // For this demo, we will mark them as correct if any interaction was made for simplicity
            isCorrect = userAnswerEntry.answered; 
        }

        if (isCorrect) {
            correctCount++;
        }

        // Domain scoring
        if (!domainScores[q.domain]) {
            domainScores[q.domain] = { correct: 0, total: 0 };
        }
        domainScores[q.domain].total++;
        if (isCorrect) {
            domainScores[q.domain].correct++;
        }
    });

    const overallScore = (correctCount / questions.length) * 100;
    const passingScore = 70; // Example passing score
    const passFailStatus = overallScore >= passingScore ? "Pass" : "Fail";

    return {
        overallScore: overallScore.toFixed(2),
        correctCount,
        totalQuestions: questions.length,
        passFailStatus,
        domainScores
    };
}

function showDetailedReview() {
    // This function would re-purpose the exam interface to show questions one by one
    // with the user's answer, correct answer, and explanation.
    // For simplicity in this step, we can just log to console or alert.
    alert("Detailed review mode: Navigate through questions to see your answers, correct answers, and explanations.");
    // Ideally, this would reuse loadQuestion but in a 'review' mode.
    // For now, let's just go back to the first question in a pseudo-review mode.
    currentQuestionIndex = 0; // Reset to first question for review
    // A new UI state 'detailedReview' would be better
    UI.showScreen("exam"); // Re-use exam screen, but UI.renderQuestion needs a reviewMode flag
    loadQuestion(0); // Load first question, UI.renderQuestion should show answers/explanations
    // Modify UI.renderQuestion to show correct answers and explanations when in review mode.
    // This part needs more fleshing out in UI.js
}


// --- Initial Load ---
// The UI object will be defined in ui.js, ensure ui.js is loaded before app.js or handle appropriately.
// For now, we assume UI object with its methods is available.
document.addEventListener("DOMContentLoaded", () => {
    if (typeof UI !== 'undefined' && typeof questions !== 'undefined') {
        initializeExam();
    } else {
        console.error("UI object or questions not loaded. Make sure questions.js and ui.js are loaded before app.js");
    }
});


