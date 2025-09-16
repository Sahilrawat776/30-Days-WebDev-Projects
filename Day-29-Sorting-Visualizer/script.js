const barsContainer = document.getElementById("bars");
const generateBtn = document.getElementById("generate");
const bubbleBtn = document.getElementById("bubble");
const selectionBtn = document.getElementById("selection");
const insertionBtn = document.getElementById("insertion");

let values = [];

// Generate random array
function generateArray(size = 30) {
  values = [];
  barsContainer.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const val = Math.floor(Math.random() * 200) + 20;
    values.push(val);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val}px`;
    barsContainer.appendChild(bar);
  }
}

generateBtn.addEventListener("click", () => generateArray());

// Helper delay for visualization
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length - i - 1; j++) {
      bars[j].style.background = "red";
      bars[j + 1].style.background = "red";

      if (values[j] > values[j + 1]) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        bars[j].style.height = `${values[j]}px`;
        bars[j + 1].style.height = `${values[j + 1]}px`;
      }
      await sleep(100);

      bars[j].style.background = "#00ffcc";
      bars[j + 1].style.background = "#00ffcc";
    }
  }
}

// Selection Sort
async function selectionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < values.length; i++) {
    let minIdx = i;
    bars[i].style.background = "blue";

    for (let j = i + 1; j < values.length; j++) {
      bars[j].style.background = "red";
      await sleep(50);

      if (values[j] < values[minIdx]) {
        minIdx = j;
      }
      bars[j].style.background = "#00ffcc";
    }

    [values[i], values[minIdx]] = [values[minIdx], values[i]];
    bars[i].style.height = `${values[i]}px`;
    bars[minIdx].style.height = `${values[minIdx]}px`;

    bars[i].style.background = "#00ffcc";
  }
}

// Insertion Sort
async function insertionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 1; i < values.length; i++) {
    let key = values[i];
    let j = i - 1;

    bars[i].style.background = "red";

    while (j >= 0 && values[j] > key) {
      values[j + 1] = values[j];
      bars[j + 1].style.height = `${values[j]}px`;
      j--;
      await sleep(100);
    }
    values[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;

    bars[i].style.background = "#00ffcc";
  }
}

// Event listeners
bubbleBtn.addEventListener("click", bubbleSort);
selectionBtn.addEventListener("click", selectionSort);
insertionBtn.addEventListener("click", insertionSort);

// Generate first array on load
generateArray();
