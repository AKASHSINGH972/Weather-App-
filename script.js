const apiKey = 'YOUR_API_KEY_HERE';

document.getElementById("searchButton").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found!');
      return response.json();
    })
    .then(data => {
      document.getElementById("weather-info").style.display = "block";
      document.getElementById("location").textContent = data.name + ', ' + data.sys.country;
      document.getElementById("temperature").textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
      document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
      document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;
    })
    .catch(() => {
      document.getElementById("weather-info").style.display = "none";
      alert("Could not fetch weather for this city.");
    });
}
