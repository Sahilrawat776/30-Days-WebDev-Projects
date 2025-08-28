const apiKey = "508fc909b2e1fbba29c93bd5780e84cb"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }
  getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert("City not found!");
      return;
    }

    const data = await response.json();
    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = `${data.main.temp} °C`;
    document.getElementById("desc").textContent = data.weather[0].description;
    document.getElementById(
      "humidity"
    ).textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById(
      "wind"
    ).textContent = `Wind: ${data.wind.speed} km/h`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
