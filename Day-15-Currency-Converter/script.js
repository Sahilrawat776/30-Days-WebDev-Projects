const API_URL = "https://api.exchangerate-api.com/v4/latest/";

const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const currency1 = document.getElementById("currency1");
const currency2 = document.getElementById("currency2");
const result = document.getElementById("result");

async function loadCurrencies() {
  try {
    const res = await fetch(API_URL + "USD");
    const data = await res.json();

    const currencies = Object.keys(data.rates);

    currencies.forEach(curr => {
      const option1 = document.createElement("option");
      option1.value = curr;
      option1.textContent = curr;

      const option2 = document.createElement("option");
      option2.value = curr;
      option2.textContent = curr;

      currency1.appendChild(option1);
      currency2.appendChild(option2);
    });

    currency1.value = "USD";
    currency2.value = "INR";
  } catch (error) {
    console.error("Error loading currencies:", error);
    result.textContent = "Failed to load currency list. Try again later.";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const amount = parseFloat(amountInput.value);
  const fromCurr = currency1.value;
  const toCurr = currency2.value;

  if (isNaN(amount) || amount <= 0) {
    result.textContent = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(API_URL + fromCurr);
    const data = await res.json();

    const rate = data.rates[toCurr];
    const converted = (amount * rate).toFixed(2);

    result.textContent = `${amount} ${fromCurr} = ${converted} ${toCurr}`;
  } catch (error) {
    console.error("Error fetching conversion:", error);
    result.textContent = "❌ Conversion failed. Please try again.";
  }
});

loadCurrencies();
