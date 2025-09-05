const boxes = document.querySelectorAll(".box");
const startBtn = document.getElementById("srt-btn");
const resumeBtn = document.getElementById("resume-btn");
const hint = document.getElementById("hint");
const timerDisplay = document.getElementById("timer");

let values = [];
let firstBox = null;
let lockBoard = false;
let timer = null;
let time = 0;
let matchedPairs = 0;
const totalPairs = boxes.length / 2;
let gameStarted = false; 

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initGame() {
  values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  shuffle(values);

  boxes.forEach((box, i) => {
    box.dataset.value = values[i];
    box.textContent = "";
    box.classList.remove("matched", "flipped");
  });

  firstBox = null;
  lockBoard = false;
  matchedPairs = 0;
  time = 0;
  timerDisplay.textContent = "0s";
  hint.textContent = "Press Start to begin";

  clearInterval(timer);
  timer = null;
  gameStarted = false;

  resumeBtn.disabled = true;
  resumeBtn.textContent = "Resume";
}

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    time++;
    timerDisplay.textContent = time + "s";
  }, 1000);
  resumeBtn.disabled = false;
  resumeBtn.textContent = "Pause";
}

function togglePause() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    resumeBtn.textContent = "Resume";
    hint.textContent = "Paused";
  } else {
    startTimer();
    hint.textContent = "Game resumed";
  }
}

function checkWin() {
  if (matchedPairs === totalPairs) {
    clearInterval(timer);
    timer = null;
    gameStarted = false; 
    hint.textContent = `You win! Time: ${time}s`;
    resumeBtn.disabled = true;
  }
}

function flipBox(box) {
  if (!gameStarted) return;
  if (lockBoard || box.classList.contains("matched") || box === firstBox)
    return;

  box.textContent = box.dataset.value;
  box.classList.add("flipped");

  if (!firstBox) {
    firstBox = box;
    return;
  }

  if (box.dataset.value === firstBox.dataset.value) {
    box.classList.add("matched");
    firstBox.classList.add("matched");
    matchedPairs++;
    firstBox = null;
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      box.textContent = "";
      firstBox.textContent = "";
      box.classList.remove("flipped");
      firstBox.classList.remove("flipped");
      firstBox = null;
      lockBoard = false;
    }, 800);
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => flipBox(box));
});

startBtn.addEventListener("click", () => {
  initGame();
  gameStarted = true; 
  startTimer();
  hint.textContent = "Game started! Match the pairs.";
});

resumeBtn.addEventListener("click", () => {
  togglePause();
});

initGame();
