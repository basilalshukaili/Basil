// ui.js - UI manipulation functions for Security+ Exam Demo

const UI = {
    // Screen elements
    welcomeScreen: document.getElementById("welcome-screen"),
    examInterface: document.getElementById("exam-interface"),
    reviewPage: document.getElementById("review-page"),
    resultsPage: document.getElementById("results-page"),

    // Exam interface elements
    questionCounter: document.getElementById("question-counter"),
    exhibitArea: document.getElementById("exhibit-area"),
    exhibitImage: document.getElementById("exhibit-image"),
    exhibitTextElem: document.getElementById("exhibit-text"), // Corrected ID reference
    questionTextP: document.getElementById("question-text-p"),
    answerOptionsDiv: document.getElementById("answer-options"),
    pbqInteractionArea: document.getElementById("pbq-interaction-area"),

    // Results page elements
    overallScoreSpan: document.getElementById("overall-score"),
    passFailStatusSpan: document.getElementById("pass-fail-status"),
    domainPerformanceDiv: document.getElementById("domain-performance"),
    reviewSummaryDiv: document.getElementById("review-summary"),

    showScreen: function(screenName) {
        this.welcomeScreen.classList.add("hidden");
        this.examInterface.classList.add("hidden");
        this.reviewPage.classList.add("hidden");
        this.resultsPage.classList.add("hidden");

        if (screenName === "welcome") this.welcomeScreen.classList.remove("hidden");
        else if (screenName === "exam") this.examInterface.classList.remove("hidden");
        else if (screenName === "review") this.reviewPage.classList.remove("hidden");
        else if (screenName === "results") this.resultsPage.classList.remove("hidden");
    },

    renderQuestion: function(question, userAnswerData) {
        this.questionCounter.textContent = `Question ${question.id} of ${questions.length}`;
        this.questionTextP.textContent = question.questionText;
        this.answerOptionsDiv.innerHTML = ""; // Clear previous options
        this.pbqInteractionArea.innerHTML = ""; // Clear previous PBQ interactions

        // Handle Exhibits
        if (question.exhibitUrl) {
            this.exhibitImage.src = question.exhibitUrl;
            this.exhibitImage.alt = `Exhibit for question ${question.id}`;
            this.exhibitArea.classList.remove("hidden");
            this.exhibitTextElem.textContent = ""; // Clear text if image is present
        } else if (question.exhibitText) { // If exhibit is text based
            this.exhibitTextElem.textContent = question.exhibitText;
            this.exhibitImage.src = ""; 
            this.exhibitArea.classList.remove("hidden");
        } else {
            this.exhibitArea.classList.add("hidden");
        }

        const previouslySelectedAnswers = userAnswerData ? userAnswerData.answer : [];

        switch (question.questionType) {
            case "multipleChoiceSingle":
            case "exhibit": // Exhibits often have MCQ single choice
                question.options.forEach(opt => {
                    const li = document.createElement("li");
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = `q${question.id}`;
                    input.id = `q${question.id}_${opt.id}`;
                    input.value = opt.id;
                    if (previouslySelectedAnswers.includes(opt.id)) input.checked = true;
                    const label = document.createElement("label");
                    label.htmlFor = `q${question.id}_${opt.id}`;
                    label.textContent = opt.text;
                    li.appendChild(input);
                    li.appendChild(label);
                    this.answerOptionsDiv.appendChild(li);
                });
                break;

            case "multipleChoiceMultiple":
                question.options.forEach(opt => {
                    const li = document.createElement("li");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    input.name = `q${question.id}`;
                    input.id = `q${question.id}_${opt.id}`;
                    input.value = opt.id;
                    if (previouslySelectedAnswers.includes(opt.id)) input.checked = true;
                    const label = document.createElement("label");
                    label.htmlFor = `q${question.id}_${opt.id}`;
                    label.textContent = opt.text;
                    li.appendChild(input);
                    li.appendChild(label);
                    this.answerOptionsDiv.appendChild(li);
                });
                break;

            case "fillInTheBlank":
                const input = document.createElement("input");
                input.type = "text";
                input.id = `q${question.id}_blank`;
                input.className = "fill-in-blank-input";
                input.value = previouslySelectedAnswers[0] || "";
                this.answerOptionsDiv.appendChild(input);
                break;
            
            case "dragAndDrop":
                this.renderDragAndDrop(question, userAnswerData);
                break;

            case "pbqLogAnalysis":
                this.renderLogAnalysis(question, userAnswerData);
                break;
            
            case "pbqFirewallConfig": // Placeholder for PBQ Firewall
                this.pbqInteractionArea.innerHTML = `<p>Firewall Configuration PBQ Simulation Area for Q${question.id}</p><p><i>(Detailed implementation for this PBQ type is pending.)</i></p>`;
                // Example: create input fields for source IP, dest IP, port, protocol, action
                const details = question.pbqData.components;
                this.pbqInteractionArea.innerHTML += `
                    <div><label>Source IP: <input type="text" id="fw_src_ip" value="${previouslySelectedAnswers[0] || details.sourceIp || ''}"></label></div>
                    <div><label>Destination IP: <input type="text" id="fw_dest_ip" value="${previouslySelectedAnswers[1] || details.destinationIp || ''}"></label></div>
                    <div><label>Destination Port: <input type="text" id="fw_dest_port" value="${previouslySelectedAnswers[2] || details.destinationPort || ''}"></label></div>
                    <div><label>Protocol: <input type="text" id="fw_protocol" value="${previouslySelectedAnswers[3] || details.protocol || ''}"></label></div>
                    <div><label>Action: <input type="text" id="fw_action" value="${previouslySelectedAnswers[4] || details.action || ''}"></label></div>
                `;
                break;

            default:
                this.answerOptionsDiv.innerHTML = "<p>Question type not yet implemented.</p>";
        }
    },

    renderDragAndDrop: function(question, userAnswerData) {
        const { draggableItems, dropZones } = question.pbqData;
        const currentMapping = (userAnswerData && userAnswerData.answer && userAnswerData.answer[0]) ? userAnswerData.answer[0] : {}; // answer[0] stores the mapping object

        const draggablesContainer = document.createElement("div");
        draggablesContainer.className = "draggables-container";
        draggablesContainer.innerHTML = "<p><strong>Drag items to the correct zones:</strong></p>";
        draggableItems.forEach(item => {
            const el = document.createElement("div");
            el.id = `drag_${question.id}_${item.id}`;
            el.className = "draggable-item";
            el.textContent = item.text;
            el.draggable = true;
            el.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", el.id);
            });
            draggablesContainer.appendChild(el);
        });
        this.pbqInteractionArea.appendChild(draggablesContainer);

        const dropZonesContainer = document.createElement("div");
        dropZonesContainer.className = "dropzones-container";
        dropZones.forEach(zone => {
            const el = document.createElement("div");
            el.id = `drop_${question.id}_${zone.id}`;
            el.className = "drop-zone";
            el.innerHTML = `<strong>${zone.label}</strong>`;
            el.addEventListener("dragover", (e) => e.preventDefault());
            el.addEventListener("drop", (e) => {
                e.preventDefault();
                const draggedItemId = e.dataTransfer.getData("text/plain");
                const draggedEl = document.getElementById(draggedItemId);
                if (draggedEl && el.contains(draggedEl) === false) { // Prevent dropping on itself if already inside
                    el.appendChild(draggedEl); // Move element
                }
            });
            // Restore previously dropped items
            for (const itemId in currentMapping) {
                if (currentMapping[itemId] === zone.id) {
                    const previouslyDraggedEl = document.getElementById(`drag_${question.id}_${itemId}`);
                    if (previouslyDraggedEl) el.appendChild(previouslyDraggedEl);
                }
            }
            dropZonesContainer.appendChild(el);
        });
        this.pbqInteractionArea.appendChild(dropZonesContainer);
    },

    renderLogAnalysis: function(question, userAnswerData) {
        const { logLines } = question.pbqData;
        const previouslySelectedLine = userAnswerData && userAnswerData.answer ? userAnswerData.answer[0] : null;

        logLines.forEach((line, index) => {
            const lineDiv = document.createElement("div");
            lineDiv.className = "log-line";
            lineDiv.textContent = line;
            lineDiv.dataset.lineNumber = index + 1; // 1-based indexing for user
            if (previouslySelectedLine && parseInt(previouslySelectedLine) === (index + 1)) {
                lineDiv.classList.add("selected-log");
            }
            lineDiv.addEventListener("click", () => {
                // Deselect previously selected line
                const currentSelected = this.pbqInteractionArea.querySelector(".selected-log");
                if (currentSelected) currentSelected.classList.remove("selected-log");
                // Select new line
                lineDiv.classList.add("selected-log");
            });
            this.pbqInteractionArea.appendChild(lineDiv);
        });
    },

    getUserAnswer: function(question) {
        let answer = [];
        switch (question.questionType) {
            case "multipleChoiceSingle":
            case "exhibit":
                const selectedRadio = this.answerOptionsDiv.querySelector(`input[name="q${question.id}"]:checked`);
                if (selectedRadio) answer.push(selectedRadio.value);
                break;
            case "multipleChoiceMultiple":
                const selectedCheckboxes = this.answerOptionsDiv.querySelectorAll(`input[name="q${question.id}"]:checked`);
                selectedCheckboxes.forEach(cb => answer.push(cb.value));
                break;
            case "fillInTheBlank":
                const inputField = document.getElementById(`q${question.id}_blank`);
                if (inputField && inputField.value.trim() !== "") answer.push(inputField.value.trim().toLowerCase());
                break;
            case "dragAndDrop":
                const mapping = {};
                question.pbqData.dropZones.forEach(zone => {
                    const zoneEl = document.getElementById(`drop_${question.id}_${zone.id}`);
                    zoneEl.querySelectorAll(".draggable-item").forEach(itemEl => {
                        const itemId = itemEl.id.split("_")[2]; // e.g., from drag_QID_ITEMID
                        mapping[itemId] = zone.id;
                    });
                });
                if (Object.keys(mapping).length > 0) answer.push(mapping);
                break;
            case "pbqLogAnalysis":
                const selectedLogLine = this.pbqInteractionArea.querySelector(".selected-log");
                if (selectedLogLine) answer.push(selectedLogLine.dataset.lineNumber);
                break;
            case "pbqFirewallConfig":
                const srcIp = document.getElementById("fw_src_ip")?.value;
                const destIp = document.getElementById("fw_dest_ip")?.value;
                const destPort = document.getElementById("fw_dest_port")?.value;
                const protocol = document.getElementById("fw_protocol")?.value;
                const action = document.getElementById("fw_action")?.value;
                // Store as an array of values or an object
                if (srcIp || destIp || destPort || protocol || action) {
                     answer = [srcIp, destIp, destPort, protocol, action];
                }
                break;
        }
        return answer;
    },

    renderReviewPage: function(questions, userAnswers) {
        this.reviewSummaryDiv.innerHTML = "";
        questions.forEach((q, index) => {
            const userAnswer = userAnswers.find(ua => ua.questionId === q.id);
            const item = document.createElement("div");
            item.className = "review-q-item";
            item.textContent = `Q ${index + 1}`;
            if (userAnswer.answered) item.classList.add("answered");
            else item.classList.add("unanswered");
            if (userAnswer.flagged) item.classList.add("flagged");
            item.addEventListener("click", () => {
                loadQuestion(index); // Assumes loadQuestion is globally available from app.js
                this.showScreen("exam");
            });
            this.reviewSummaryDiv.appendChild(item);
        });
    },

    renderResultsPage: function(results, questionsData, userAnswersData) {
        this.overallScoreSpan.textContent = results.overallScore;
        this.passFailStatusSpan.textContent = results.passFailStatus;
        this.passFailStatusSpan.className = results.passFailStatus.toLowerCase();

        this.domainPerformanceDiv.innerHTML = "";
        for (const domainName in results.domainScores) {
            const ds = results.domainScores[domainName];
            const percentage = ds.total > 0 ? ((ds.correct / ds.total) * 100).toFixed(2) : 0;
            const p = document.createElement("p");
            p.textContent = `${domainName}: ${ds.correct}/${ds.total} (${percentage}% correct)`;
            this.domainPerformanceDiv.appendChild(p);
        }
        // Detailed review button functionality is in app.js, this just renders the page
    }
};

