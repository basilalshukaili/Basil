document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let questions = []; // Will be assigned from window.questionsData
    const userAnswers = [];
    const userSession = {
        answers: {},
        currentScore: 0,
        totalQuestions: 0
    };

    // DOM Elements
    const questionTextElem = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackArea = document.getElementById('feedback-area');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const submitButton = document.getElementById('submit-btn');
    const questionCounterElem = document.getElementById('question-counter');

    if (!questionTextElem || !optionsContainer || !feedbackArea || !prevButton || !nextButton || !submitButton || !questionCounterElem) {
        console.error("One or more required DOM elements are missing.");
        return;
    }

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

            questions = window.questionsData || [];

            if (questions.length === 0) {
                throw new Error("No questions loaded. Check questions.js file and path.");
            }

            userSession.totalQuestions = questions.length;
            loadQuestion(currentQuestionIndex);
        } catch (error) {
            console.error("Error initializing demo:", error);
            feedbackArea.innerHTML = `<p>Error: ${error.message}</p>`;
            feedbackArea.style.display = 'block';
        }
    }

    function loadQuestion(index) {
        if (index < 0 || index >= questions.length) return;
        const question = questions[index];
        questionTextElem.textContent = question.questionText;
        optionsContainer.innerHTML = '';

        question.options.forEach((opt, optIndex) => {
            const li = document.createElement('li');
            const input = document.createElement('input');
            const inputType = question.questionType === 'multipleChoiceMultiple' ? 'checkbox' : 'radio';
            input.type = inputType;
            input.name = 'answer';
            input.id = `q${index}_opt${optIndex}`;
            input.value = opt.id;

            const label = document.createElement('label');
            label.htmlFor = input.id;
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
        const currentQ = questions[currentQuestionIndex];
        const selectedOptions = Array.from(optionsContainer.querySelectorAll('input[name="answer"]:checked'))
            .map(input => input.value);

        if (selectedOptions.length === 0) {
            alert('Please select an answer.');
            return;
        }

        userAnswers[currentQuestionIndex] = {
            questionId: currentQ.id,
            answer: selectedOptions,
            attempted: true
        };

        const isCorrect = currentQ.correctAnswer.length === selectedOptions.length &&
            currentQ.correctAnswer.every(val => selectedOptions.includes(val));

        displayFeedback(isCorrect, currentQ.correctAnswer, currentQ.explanation);
        submitButton.disabled = true;
        updateNavigationButtons();
    }

    function displayFeedback(isCorrect, correctAnswer, explanation) {
        feedbackArea.innerHTML = '';
        const result = document.createElement('h3');
        result.textContent = isCorrect ? 'Correct!' : 'Incorrect.';
        result.style.color = isCorrect ? 'green' : 'red';

        const answerElem = document.createElement('p');
        answerElem.innerHTML = `<strong>Correct Answer(s):</strong> ${correctAnswer.join(', ')}`;

        const explanationElem = document.createElement('p');
        explanationElem.innerHTML = `<strong>Explanation:</strong> ${explanation || 'N/A'}`;

        feedbackArea.appendChild(result);
        feedbackArea.appendChild(answerElem);
        feedbackArea.appendChild(explanationElem);
        feedbackArea.style.display = 'block';
    }

    function updateNavigationButtons() {
        prevButton.disabled = currentQuestionIndex === 0;

        const currentAnswer = userAnswers[currentQuestionIndex];
        nextButton.disabled = !currentAnswer || !currentAnswer.attempted || currentQuestionIndex >= questions.length - 1;
    }

    initializeDemo();
});
