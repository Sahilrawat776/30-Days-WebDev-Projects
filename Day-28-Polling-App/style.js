let votes = { A: 0, B: 0, C: 0 };

function vote(option) {
  votes[option]++;
  updateResults();
}

function updateResults() {
  const total = votes.A + votes.B + votes.C;

  const percentA = total ? (votes.A / total) * 100 : 0;
  const percentB = total ? (votes.B / total) * 100 : 0;
  const percentC = total ? (votes.C / total) * 100 : 0;

  document.getElementById("barA").style.width = percentA + "%";
  document.getElementById("barB").style.width = percentB + "%";
  document.getElementById("barC").style.width = percentC + "%";

  document.getElementById("countA").innerText = votes.A;
  document.getElementById("countB").innerText = votes.B;
  document.getElementById("countC").innerText = votes.C;
}
