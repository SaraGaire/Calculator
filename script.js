const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

const display = document.getElementById("display");
const aiInput = document.getElementById("aiInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const voiceBtn = document.getElementById("voiceBtn");
const languageSelect = document.getElementById("languageSelect");
const darkModeToggle = document.getElementById("darkModeToggle");

// Append value on calculator display
function appendValue(val) {
  display.value += val;
}

// Clear display
function clearDisplay() {
  display.value = "";
}

// Calculate using safe math parser — extended to support Math functions
function calculate() {
  try {
    // Replace common math symbols with JS equivalents
    let expression = display.value
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/−/g, "-")
      .replace(/√/g, "Math.sqrt");

    // Evaluate expression using Function constructor for safety
    let func = new Function("return " + expression);
    let result = func();

    display.value = result;
    speak(`The result is ${result}`);
    addChatMessage(expression, result);
  } catch (e) {
    display.value = "Error";
    speak("Invalid expression");
  }
}

// Add messages to chat box
function addChatMessage(userText, aiText) {
  const userMsg = document.createElement("div");
  userMsg.className = "chat-message user";
  userMsg.textContent = "You: " + userText;

  const aiMsg = document.createElement("div");
  aiMsg.className = "chat-message ai";
  aiMsg.textContent = "AI: " + aiText;

  chatBox.appendChild(userMsg);
  chatBox.appendChild(aiMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Speak text using selected voice language
function speak(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageSelect.value;
    speechSynthesis.speak(utterance);
  }
}

// Check if input is simple math expression (digits, + - * / . () and Math.func)
function isSimpleMath(input) {
  // Allow digits, spaces, math operators, dots, parentheses, and Math.func keywords
  return /^[0-9+\-*/().\sMathsincoaltgrqtpxzvu]+$/
