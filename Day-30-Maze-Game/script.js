// Maze Game with recursive backtracker,auto-solve (BFS)

const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("status");
const regenBtn = document.getElementById("regen");
const solveBtn = document.getElementById("solve");
const rowsInput = document.getElementById("rowsInput");
const colsInput = document.getElementById("colsInput");

// mobile controls
document.getElementById("upBtn").addEventListener("click", () => move(0, -1));
document.getElementById("downBtn").addEventListener("click", () => move(0, 1));
document.getElementById("leftBtn").addEventListener("click", () => move(-1, 0));
document.getElementById("rightBtn").addEventListener("click", () => move(1, 0));

regenBtn.addEventListener("click", () => initMaze());
solveBtn.addEventListener("click", () => autoSolve());

let rows = parseInt(rowsInput.value, 10) || 15;
let cols = parseInt(colsInput.value, 10) || 15;

rowsInput.addEventListener("change", () => initMaze());
colsInput.addEventListener("change", () => initMaze());

let grid = [];
let cellSize = 30;
let player = { r: 0, c: 0 };
let goal = { r: 0, c: 0 };
let solvedPath = null;

// keep canvas crisp on high-DPI screens
function resizeCanvas() {
  const styleW = canvas.clientWidth;
  const styleH = canvas.clientHeight;
  const DPR = window.devicePixelRatio || 1;
  canvas.width = Math.floor(styleW * DPR);
  canvas.height = Math.floor(styleH * DPR);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0); // scale drawing operations
}
window.addEventListener("resize", resizeCanvas);

// cell constructor
function makeCell(r, c) {
  return {
    r,
    c,
    walls: { top: true, right: true, bottom: true, left: true },
    visited: false,
  };
}

// neighbors helper
function neighbors(cell) {
  const arr = [];
  const { r, c } = cell;
  if (r > 0) arr.push({ dir: "top", cell: grid[r - 1][c] });
  if (c < cols - 1) arr.push({ dir: "right", cell: grid[r][c + 1] });
  if (r < rows - 1) arr.push({ dir: "bottom", cell: grid[r + 1][c] });
  if (c > 0) arr.push({ dir: "left", cell: grid[r][c - 1] });
  return arr;
}

// remove walls between two adjacent cells
function removeWalls(a, b) {
  const dr = b.r - a.r;
  const dc = b.c - a.c;
  if (dr === 1) {
    a.walls.bottom = false;
    b.walls.top = false;
  } else if (dr === -1) {
    a.walls.top = false;
    b.walls.bottom = false;
  } else if (dc === 1) {
    a.walls.right = false;
    b.walls.left = false;
  } else if (dc === -1) {
    a.walls.left = false;
    b.walls.right = false;
  }
}

// recursive backtracker (iterative)
function generateMaze() {
  // init grid
  grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) row.push(makeCell(r, c));
    grid.push(row);
  }

  const stack = [];
  const start = grid[0][0];
  start.visited = true;
  stack.push(start);

  while (stack.length) {
    const current = stack[stack.length - 1];
    const unvisited = neighbors(current).filter((n) => !n.cell.visited);
    if (unvisited.length) {
      const pick = unvisited[Math.floor(Math.random() * unvisited.length)];
      pick.cell.visited = true;
      removeWalls(current, pick.cell);
      stack.push(pick.cell);
    } else {
      stack.pop();
    }
  }
}

// drawing
function drawMaze() {
  resizeCanvas();
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  cellSize = Math.min(W / cols, H / rows);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background
  ctx.fillStyle = "#071220";
  ctx.fillRect(0, 0, W, H);

  // walls
  ctx.strokeStyle = "#e6eef6";
  ctx.lineWidth = 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      const x = c * cellSize;
      const y = r * cellSize;

      if (cell.walls.top) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellSize, y);
        ctx.stroke();
      }
      if (cell.walls.right) {
        ctx.beginPath();
        ctx.moveTo(x + cellSize, y);
        ctx.lineTo(x + cellSize, y + cellSize);
        ctx.stroke();
      }
      if (cell.walls.bottom) {
        ctx.beginPath();
        ctx.moveTo(x + cellSize, y + cellSize);
        ctx.lineTo(x, y + cellSize);
        ctx.stroke();
      }
      if (cell.walls.left) {
        ctx.beginPath();
        ctx.moveTo(x, y + cellSize);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  }

  // highlight solved path if present
  if (Array.isArray(solvedPath)) {
    ctx.fillStyle = "rgba(34,197,94,0.25)";
    solvedPath.forEach((p) => {
      ctx.fillRect(
        p.c * cellSize + 2,
        p.r * cellSize + 2,
        cellSize - 4,
        cellSize - 4
      );
    });
  }

  // goal
  ctx.fillStyle = "#22c55e";
  ctx.fillRect(
    goal.c * cellSize + 6,
    goal.r * cellSize + 6,
    cellSize - 12,
    cellSize - 12
  );

  // player
  const px = player.c * cellSize + cellSize / 2;
  const py = player.r * cellSize + cellSize / 2;
  ctx.beginPath();
  ctx.fillStyle = "#facc15";
  ctx.arc(px, py, Math.max(6, cellSize / 4), 0, Math.PI * 2);
  ctx.fill();
}

// movement checks walls and moves
function canMove(r, c, dr, dc) {
  const cell = grid[r][c];
  if (dr === -1 && !cell.walls.top) return true;
  if (dr === 1 && !cell.walls.bottom) return true;
  if (dc === -1 && !cell.walls.left) return true;
  if (dc === 1 && !cell.walls.right) return true;
  return false;
}

function move(dx, dy) {
  const nr = player.r + dy;
  const nc = player.c + dx;
  if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;
  if (canMove(player.r, player.c, dy, dx)) {
    player.r = nr;
    player.c = nc;
    solvedPath = null; // clear any previous highlight when player moves
    drawMaze();
    checkWin();
  } else {
    // small shake indicator (optional)
    // briefly show message
    statusEl.textContent = "Blocked!";
    setTimeout(() => {
      if (statusEl.textContent === "Blocked!") statusEl.textContent = "";
    }, 400);
  }
}

function checkWin() {
  if (player.r === goal.r && player.c === goal.c) {
    statusEl.textContent = "🎉 You reached the goal!";
  } else {
    statusEl.textContent = "";
  }
}

// keyboard controls
window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "w",
      "a",
      "s",
      "d",
      "W",
      "A",
      "S",
      "D",
    ].includes(key)
  ) {
    e.preventDefault();
    if (key === "ArrowUp" || key === "w" || key === "W") move(0, -1);
    if (key === "ArrowDown" || key === "s" || key === "S") move(0, 1);
    if (key === "ArrowLeft" || key === "a" || key === "A") move(-1, 0);
    if (key === "ArrowRight" || key === "d" || key === "D") move(1, 0);
  }
});

// BFS auto-solve returning path from player to goal
function bfsSolve() {
  const start = { r: player.r, c: player.c };
  const q = [start];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  visited[start.r][start.c] = true;

  while (q.length) {
    const cur = q.shift();
    if (cur.r === goal.r && cur.c === goal.c) {
      const path = [];
      let p = cur;
      while (p) {
        path.push(p);
        p = parent[p.r][p.c];
      }
      path.reverse();
      return path;
    }

    // neighbors by checking possible moves (respecting walls)
    const dirs = [
      { dr: -1, dc: 0 },
      { dr: 1, dc: 0 },
      { dr: 0, dc: -1 },
      { dr: 0, dc: 1 },
    ];
    for (const d of dirs) {
      const nr = cur.r + d.dr;
      const nc = cur.c + d.dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (visited[nr][nc]) continue;
      // check wall between cur and neighbor
      if (canMove(cur.r, cur.c, d.dr, d.dc)) {
        visited[nr][nc] = true;
        parent[nr][nc] = cur;
        q.push({ r: nr, c: nc });
      }
    }
  }
  return null;
}

// animate auto-solve visually
async function autoSolve() {
  const path = bfsSolve();
  if (!path) {
    statusEl.textContent = "No path found!";
    return;
  }
  solvedPath = path;
  drawMaze();
  // animate player along path
  for (let i = 1; i < path.length; i++) {
    await new Promise((r) => setTimeout(r, 120));
    player.r = path[i].r;
    player.c = path[i].c;
    drawMaze();
  }
  checkWin();
}

// init maze and draw
function initMaze() {
  // ensure odd counts for nice mazes (optional)
  rows = parseInt(rowsInput.value, 10) || 15;
  cols = parseInt(colsInput.value, 10) || 15;
  rows = Math.max(5, Math.min(51, rows));
  cols = Math.max(5, Math.min(51, cols));
  // regenerate grid
  generateMaze();
  player = { r: 0, c: 0 };
  goal = { r: rows - 1, c: cols - 1 };
  solvedPath = null;
  statusEl.textContent = "";
  drawMaze();
}

// initial setup
resizeCanvas();
initMaze();
