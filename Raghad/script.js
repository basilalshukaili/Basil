document.addEventListener("DOMContentLoaded", () => {
    const dialogue = [
        {
            speaker: "basil",
            text: "You know, Raghad, I think the stars are jealous tonight. They’re shining so bright, but they can’t compare to the way your eyes light up when you look at the sky."
        },
        {
            speaker: "raghad",
            text: "Oh, Basil, you always say the sweetest things. But honestly… sitting here with you, I feel like I’m the luckiest girl in the universe. The stars could fall, and I wouldn’t even notice—I’d still be lost in this moment with you."
        },
        {
            speaker: "basil",
            text: "And I’d catch every single one of those stars for you if I could. But honestly, I don’t need to… because you’re my whole sky, Raghad. Every night with you feels like a dream I never want to wake up from."
        },
        {
            speaker: "raghad",
            text: "Then let’s keep dreaming together, Basil. Under this moon, by this lake… I don’t think I’ve ever felt so close to someone. I love you."
        },
        {
            speaker: "basil",
            text: "I love you too, Raghad. More than all the stars combined."
        }
    ];

    const basilDialogueBox = document.getElementById("basil-dialogue");
    const raghadDialogueBox = document.getElementById("raghad-dialogue");
    const basilTextElement = basilDialogueBox.querySelector(".dialogue-text");
    const raghadTextElement = raghadDialogueBox.querySelector(".dialogue-text");

    let currentDialogueIndex = 0;
    const wordRevealSpeed = 200; // Milliseconds per word
    const pauseBetweenDialogues = 2500; // Milliseconds pause after a line is complete
    const pauseBeforeNextSpeaker = 1000; // Milliseconds pause before next speaker starts

    function typeWordByWord(textElement, text, callback) {
        textElement.innerHTML = ""; // Clear previous text
        const words = text.split(" ");
        let wordIndex = 0;

        function addWord() {
            if (wordIndex < words.length) {
                const span = document.createElement("span");
                span.textContent = words[wordIndex];
                span.style.opacity = "0";
                span.style.transform = "translateY(10px)";
                span.style.display = "inline-block"; // Ensures animation applies correctly
                span.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
                textElement.appendChild(span);

                // Add a space after the word if it's not the last word
                if (wordIndex < words.length - 1) {
                    textElement.appendChild(document.createTextNode(" "));
                }
                
                // Trigger reflow to apply initial styles before transition
                void span.offsetWidth;

                span.style.opacity = "1";
                span.style.transform = "translateY(0px)";
                
                wordIndex++;
                setTimeout(addWord, wordRevealSpeed);
            } else {
                if (callback) setTimeout(callback, pauseBetweenDialogues);
            }
        }
        addWord();
    }

    function showNextDialogue() {
        if (currentDialogueIndex >= dialogue.length) {
            console.log("Dialogue finished.");
            setTimeout(() => {
                basilDialogueBox.style.opacity = "0";
                raghadDialogueBox.style.opacity = "0";
            }, pauseBetweenDialogues);
            return;
        }

        const currentEntry = dialogue[currentDialogueIndex];
        let activeBox, activeTextElement, inactiveBox;

        if (currentEntry.speaker === "basil") {
            activeBox = basilDialogueBox;
            activeTextElement = basilTextElement;
            inactiveBox = raghadDialogueBox;
        } else {
            activeBox = raghadDialogueBox;
            activeTextElement = raghadTextElement;
            inactiveBox = basilDialogueBox;
        }

        inactiveBox.style.opacity = "0";
        activeTextElement.innerHTML = ""; // Clear text before typing new line
        activeBox.style.opacity = "1";
        
        typeWordByWord(activeTextElement, currentEntry.text, () => {
            currentDialogueIndex++;
            const nextSpeakerPause = (currentDialogueIndex < dialogue.length) ? pauseBeforeNextSpeaker : 0;
            setTimeout(showNextDialogue, nextSpeakerPause);
        });
    }

    setTimeout(showNextDialogue, 500);
});

