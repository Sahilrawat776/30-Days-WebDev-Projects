const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// More natural bot replies with simple keyword matching
const botReplies = {
  hello: [
    "Hi there! 👋",
  ],
  how: [
    "I’m doing great, thanks for asking! How about you?",
    "All good here 👍, what about you?",
  ],
  name: ["You can call me ChatBot 🤖", "I’m your friendly chat assistant!"],
  default: [
    "Hmm, interesting! Tell me more 🤔",
    "Got it! 👍",
    "That sounds cool 😎",
    "I’m listening 👂",
    "Can you explain a bit more?",
  ],
};

// function to add a message
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight; // auto scroll
}

// function to generate bot reply based on keywords
function getBotReply(userText) {
  const text = userText.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) {
    return botReplies.hello[
      Math.floor(Math.random() * botReplies.hello.length)
    ];
  } else if (text.includes("how")) {
    return botReplies.how[Math.floor(Math.random() * botReplies.how.length)];
  } else if (text.includes("name")) {
    return botReplies.name[Math.floor(Math.random() * botReplies.name.length)];
  } else {
    return botReplies.default[
      Math.floor(Math.random() * botReplies.default.length)
    ];
  }
}

// user message
function sendMessage() {
  const text = input.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";

  // bot auto reply after short delay
  setTimeout(() => {
    const reply = getBotReply(text);
    addMessage(reply, "bot");
  }, 800);
}

// event listeners
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
