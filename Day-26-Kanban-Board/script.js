const COLUMNS = ["todo", "in-progress", "done"];
let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || {
  todo: [],
  "in-progress": [],
  done: [],
};

function saveTasks() {
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderTasks() {
  // clear lists
  COLUMNS.forEach((col) => {
    const el = document.getElementById(col);
    if (el) el.innerHTML = "";
  });

  // render each task object {id,text}
  COLUMNS.forEach((col) => {
    const list = document.getElementById(col);
    if (!list) return;
    tasks[col].forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
      taskDiv.draggable = true;
      taskDiv.dataset.id = task.id;

      taskDiv.innerHTML = `
        <div class="task-text">${escapeHtml(task.text)}</div>
        <div class="controls">
          <button class="edit-btn" title="Edit">✏️</button>
          <button class="del-btn" title="Delete">✖</button>
        </div>
      `;

      // dragstart: store id in dataTransfer
      taskDiv.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", task.id);
        e.dataTransfer.effectAllowed = "move";
      });

      // edit handler
      const editBtn = taskDiv.querySelector(".edit-btn");
      const textSpan = taskDiv.querySelector(".task-text");
      editBtn.addEventListener("click", () => {
        textSpan.contentEditable = "true";
        textSpan.focus();
        const range = document.createRange();
        range.selectNodeContents(textSpan);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });
      // save on blur or Enter
      textSpan.addEventListener("blur", () => {
        const newText = textSpan.innerText.trim();
        updateTaskText(task.id, newText || task.text);
      });
      textSpan.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          textSpan.blur();
        }
      });

      // delete handler
      const delBtn = taskDiv.querySelector(".del-btn");
      delBtn.addEventListener("click", () => deleteTaskById(task.id));

      list.appendChild(taskDiv);
    });
  });
}

// add a new task to column
function addTask(column) {
  const input = document.getElementById(column + "-input");
  if (!input) return;
  const text = input.value.trim();
  if (!text) return; // prevent undefined

  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const task = { id, text };

  if (!tasks[column]) tasks[column] = [];
  tasks[column].push(task);

  input.value = "";
  saveTasks();
  renderTasks();
}

// delete by id
function deleteTaskById(id) {
  for (let col of COLUMNS) {
    const idx = tasks[col].findIndex((t) => t.id === id);
    if (idx > -1) {
      tasks[col].splice(idx, 1);
      saveTasks();
      renderTasks();
      return;
    }
  }
}

// update text by id
function updateTaskText(id, newText) {
  for (let col of COLUMNS) {
    const t = tasks[col].find((t) => t.id === id);
    if (t) {
      t.text = newText;
      saveTasks();
      renderTasks();
      return;
    }
  }
}

/* Drag & drop handlers on lists */
document.querySelectorAll(".task-list").forEach((list) => {
  list.addEventListener("dragover", (e) => e.preventDefault());

  list.addEventListener("dragenter", (e) => {
    e.preventDefault();
    list.classList.add("dragover");
  });

  list.addEventListener("dragleave", () => {
    list.classList.remove("dragover");
  });

  list.addEventListener("drop", (e) => {
    e.preventDefault();
    list.classList.remove("dragover");
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;

    // find and remove from source
    let moved = null;
    for (let col of COLUMNS) {
      const idx = tasks[col].findIndex((t) => t.id === id);
      if (idx > -1) {
        moved = tasks[col].splice(idx, 1)[0];
        break;
      }
    }
    if (!moved) return;

    // append to target column (list.id)
    const targetCol = list.id;
    if (!tasks[targetCol]) tasks[targetCol] = [];
    tasks[targetCol].push(moved);

    saveTasks();
    renderTasks();
  });
});

// wire add buttons if present
COLUMNS.forEach((col) => {
  const btn = document.querySelector(`button[onclick="addTask('${col}')"]`);
  if (btn) btn.addEventListener("click", () => addTask(col));
});

// initial render
if (!tasks.todo) tasks = { todo: [], "in-progress": [], done: [] }; // ensure structure
renderTasks();
