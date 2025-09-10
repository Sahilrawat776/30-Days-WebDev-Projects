const btn = document.querySelector("#getPrice");
const cryptoSelect = document.querySelector("#crypto");
const cryptoName = document.querySelector("#cryptoName");
const price = document.querySelector("#price");

// Event listener
btn.addEventListener("click", async () => {
  const selectedCrypto = cryptoSelect.value;

  // Loading state
  cryptoName.textContent = "Loading...";
  price.textContent = "";

  try {
    // Using CoinGecko Free API (no key required)
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=inr`
    );

    if (!res.ok) throw new Error("Failed to fetch data");

    const data = await res.json();

    // Update UI
    cryptoName.textContent = selectedCrypto.toUpperCase();
    price.textContent = `Price: ₹ ${data[selectedCrypto].inr.toLocaleString()}`;
  } catch (error) {
    cryptoName.textContent = "Error";
    price.textContent = "Could not fetch data ❌";
  }
});
