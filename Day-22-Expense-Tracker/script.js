const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const listEl = document.getElementById("transaction-list");
const form = document.getElementById("transaction-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
  const amounts = transactions.map((t) => t.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balanceEl.textContent = `Rs. ${total}`;
  incomeEl.textContent = `+Rs. ${income}`;
  expenseEl.textContent = `-Rs. ${expense}`;
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}Rs. ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
  `;

  listEl.appendChild(item);
}

function updateUI() {
  listEl.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction(e) {
  e.preventDefault();
  if (textInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Please enter a description and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    text: textInput.value,
    amount: +amountInput.value,
  };

  transactions.push(transaction);
  updateUI();

  textInput.value = "";
  amountInput.value = "";
}

function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  updateUI();
}

form.addEventListener("submit", addTransaction);

// Initial load
updateUI();
