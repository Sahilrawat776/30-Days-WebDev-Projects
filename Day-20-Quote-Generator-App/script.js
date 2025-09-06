const quote = document.querySelector(".content");
const btn = document.querySelector("button");

btn.addEventListener("click", async () => {
  quote.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();


    const randomQuote = data[Math.floor(Math.random() * data.length)];

    quote.innerHTML = `
      <p>"${randomQuote.text}"</p>
      <p>- ${randomQuote.author || "Unknown"}</p>
    `;
  } catch (error) {
    quote.innerHTML = `<p style="color:red;">Quote is not available</p>`;
    console.error(error);
  }
});


