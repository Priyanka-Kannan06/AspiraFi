const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const speakButton = document.getElementById("speak-button");

function sendMessage() {
    let userMessage = userInput.value.trim();
    if (userMessage === "") return;

    appendMessage("You", userMessage);
    userInput.value = "";

    // Detect language and generate response
    let detectedLang = detectLanguage(userMessage);
    let botResponse = getBotResponse(userMessage, detectedLang);

    setTimeout(() => {
        appendMessage("AspiraBot", botResponse);
        speakText(botResponse, detectedLang);
    }, 1000);
}

function appendMessage(sender, message) {
    let msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Language Detection (Basic Keyword-based)
function detectLanguage(text) {
    const tamilWords = ["கடன்", "சேமிப்பு", "பண"];
    const hindiWords = ["ऋण", "बजट", "बचत"];
    
    if (tamilWords.some(word => text.includes(word))) return "ta";
    if (hindiWords.some(word => text.includes(word))) return "hi";
    return "en"; // Default to English
}

// Get Response in Different Languages
function getBotResponse(input, lang) {
    const responses = {
        en: {
            loan: "A loan is borrowed money that must be repaid with interest.",
            budget: "Budgeting helps you track expenses and save money.",
            default: "I'm here to help! Ask me anything about finance."
        },
        ta: {
            loan: "கடன் என்பது மீட்டுத் தர வேண்டிய பணமாகும்.",
            budget: "பட்ஜெட் உங்கள் செலவுகளை கண்காணிக்க உதவுகிறது.",
            default: "நீங்கள் எந்த பொருளாதார கேள்வியும் கேட்கலாம்!"
        },
        hi: {
            loan: "ऋण एक उधार ली गई राशि है जिसे ब्याज के साथ चुकाना होता है।",
            budget: "बजट आपको खर्च ट्रैक करने और पैसे बचाने में मदद करता है।",
            default: "मैं आपकी मदद के लिए यहां हूँ! वित्त से जुड़ा कुछ भी पूछें।"
        }
    };

    input = input.toLowerCase();
    if (input.includes("loan") || input.includes("கடன்") || input.includes("ऋण")) return responses[lang].loan;
    if (input.includes("budget") || input.includes("சேமிப்பு") || input.includes("बजट")) return responses[lang].budget;
    return responses[lang].default;
}

// Text-to-Speech in Selected Language
function speakText(text, lang) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang === "ta" ? "ta-IN" : lang === "hi" ? "hi-IN" : "en-US"; // Set correct voice language
    window.speechSynthesis.speak(speech);
}

// Speak Last Response on Button Click
speakButton.addEventListener("click", () => {
    let lastBotMessage = document.querySelector("#chat-box .message:last-child");
    if (lastBotMessage) {
        let detectedLang = detectLanguage(lastBotMessage.textContent);
        speakText(lastBotMessage.textContent, detectedLang);
    }
});
