const form = document.querySelector("#movie-form");
const input = document.querySelector("#movie-input");
const result = document.querySelector("#result");

// Replace with your OMDb API key
const API_KEY = "5ca0b294";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const movie = input.value.trim();
  if (!movie) return;

  result.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?t=${movie}&apikey=${API_KEY}`
    );
    const data = await res.json();

    if (data.Response === "False") {
      result.innerHTML = `<p style="color:red">❌ Movie not found. Try again!</p>`;
      return;
    }

    // Show movie details
    result.innerHTML = `
      <img src="${
        data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/150"
      }" alt="${data.Title}">
      <h2>${data.Title} (${data.Year})</h2>
      <p><strong>Genre:</strong> ${data.Genre}</p>
      <p><strong>Director:</strong> ${data.Director}</p>
      <p><strong>Actors:</strong> ${data.Actors}</p>
      <p><strong>Plot:</strong> ${data.Plot}</p>
    `;
  } catch (error) {
    result.innerHTML = `<p style="color:red">⚠️ Error fetching data</p>`;
  }
});
