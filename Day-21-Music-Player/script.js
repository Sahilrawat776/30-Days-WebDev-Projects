const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const results = document.getElementById("results");
const audio = document.getElementById("audio");
const title = document.getElementById("title");

// Search songs
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  results.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&limit=10`
    );
    const data = await res.json();

    results.innerHTML = "";

    data.results.forEach((song) => {
      const div = document.createElement("div");
      div.classList.add("song");
      div.innerHTML = `
        <p>${song.trackName} - ${song.artistName}</p>
        <button class="play-btn">▶️ Play</button>
      `;

      // Play preview when clicked
      div.querySelector(".play-btn").addEventListener("click", () => {
        audio.src = song.previewUrl;
        title.textContent = `${song.trackName} - ${song.artistName}`;
        audio.play();
      });

      results.appendChild(div);
    });
  } catch (err) {
    results.innerHTML = `<p style="color:red;">Error fetching songs</p>`;
  }
});
