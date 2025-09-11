// minimal comments where logic may be tricky

const SAMPLE = [
  "The quick brown fox jumps over the lazy dog.",
  "Learning to code is a journey — small steps every day add up.",
  "Practice consistently and your skills will grow exponentially.",
  "Write clean code, read other people's code, and ask good questions.",
  "A bug is an opportunity to learn something new about your program.",
];

const textDisplay = document.getElementById("text-display");
const input = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const bestEl = document.getElementById("best");

let target = "";
let chars = []; // array of characters of target
let started = false;
let startTime = 0;
let intervalId = null;
let correctCount = 0;
let totalTyped = 0;
let bestWPM = Number(localStorage.getItem("bestWPM") || 0);

bestEl.textContent = bestWPM;

// pick a random sentence and render as span-per-char
function loadNewText() {
  target = SAMPLE[Math.floor(Math.random() * SAMPLE.length)];
  chars = target.split("");
  textDisplay.innerHTML = chars
    .map((c) => `<span class="char">${escapeHtml(c)}</span>`)
    .join("");
  markCurrentChar(0);
}

// escape to prevent HTML injection for characters like '<'
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function markCurrentChar(index) {
  const spans = textDisplay.querySelectorAll(".char");
  spans.forEach((sp, i) => {
    spans[i].classList.remove("current", "correct", "incorrect");
    if (i < index) {
      // keep previous status as-is (already set)
    } else if (i === index) {
      spans[i].classList.add("current");
    }
  });
}

// start timer
function startTimer() {
  if (started) return;
  started = true;
  startTime = Date.now();
  intervalId = setInterval(updateMetrics, 100);
}

// stop timer
function stopTimer() {
  started = false;
  clearInterval(intervalId);
  updateMetrics(); // final update
}

// compute and show timer, wpm, accuracy
function updateMetrics() {
  const elapsedMs = Date.now() - startTime;
  const seconds = Math.max(0.001, elapsedMs / 1000);
  timerEl.textContent = seconds.toFixed(1);
  const wordsTyped = totalTyped / 5; // standard: 1 word = 5 chars
  const wpm = Math.round(wordsTyped / (seconds / 60));
  wpmEl.textContent = isFinite(wpm) ? wpm : 0;
  const accuracy =
    totalTyped === 0 ? 100 : Math.round((correctCount / totalTyped) * 100);
  accuracyEl.textContent = accuracy;

  // save best
  if (isFinite(wpm) && wpm > bestWPM) {
    bestWPM = wpm;
    bestEl.textContent = bestWPM;
    localStorage.setItem("bestWPM", bestWPM);
  }
}

// process input on every change
input.addEventListener("input", (e) => {
  const value = e.target.value;
  if (!started) startTimer();

  totalTyped = value.length;
  correctCount = 0;

  const spans = textDisplay.querySelectorAll(".char");
  const len = Math.min(value.length, spans.length);

  for (let i = 0; i < len; i++) {
    const ch = value[i];
    if (ch === chars[i]) {
      spans[i].classList.add("correct");
      spans[i].classList.remove("incorrect");
      correctCount++;
    } else {
      spans[i].classList.add("incorrect");
      spans[i].classList.remove("correct");
    }
  }

  // clear remaining spans when user is shorter than target
  for (let i = len; i < spans.length; i++) {
    spans[i].classList.remove("correct", "incorrect");
  }

  markCurrentChar(value.length);

  // finished typing full target
  if (value.length >= chars.length) {
    stopTimer();
    input.disabled = true;
  }

  updateMetrics();
});

// start button behavior
startBtn.addEventListener("click", () => {
  resetTest();
  input.focus();
});

// restart resets test but keeps best
restartBtn.addEventListener("click", resetTest);

function resetTest() {
  stopTimer();
  input.disabled = false;
  input.value = "";
  totalTyped = 0;
  correctCount = 0;
  timerEl.textContent = "0.0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100";
  loadNewText();
  input.focus();
}

// initialize
loadNewText();
