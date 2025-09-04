const form = document.querySelector("#search-form");
const queryInput = document.querySelector("#query");
const results = document.querySelector("#results");
const message = document.querySelector("#status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = queryInput.value.trim();
  if (!query) return;

  message.textContent = "Loading recipes...";
  results.innerHTML = "";

  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    if (!data.meals) {
      message.textContent = "❌ No recipes found. Try another search.";
      return;
    }

    message.textContent = `Found ${data.meals.length} recipes:`;

    // each recipe card
    data.meals.forEach((meal) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="card-body">
          <h3>${meal.strMeal}</h3>
          <a href="${meal.strSource || "#"}" target="_blank">View Recipe</a>
        </div>
      `;

      results.appendChild(card);
    });
  } catch (err) {
    message.textContent = "⚠️ Something went wrong, please try again.";
  }
});
