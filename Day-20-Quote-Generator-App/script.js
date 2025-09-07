const quote = document.querySelector(".content");
const btn = document.querySelector("button");

// Array of quotes
const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Don’t let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    text: "It’s not whether you get knocked down, it’s whether you get up.",
    author: "Vince Lombardi",
  },
  {
    text: "If you are working on something exciting, it will keep you motivated.",
    author: "Steve Jobs",
  },
  {
    text: "Success is not in what you have, but who you are.",
    author: "Bo Bennett",
  },
];

btn.addEventListener("click", () => {
  // Pick a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selected = quotes[randomIndex];

  // Show it
  quote.innerHTML = `
    <p>"${selected.text}"</p>
    <small>— ${selected.author}</small>
  `;
});
