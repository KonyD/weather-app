const apiKey = 'Your API Key';

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInputEl.value;
    getWeatherData(city);
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error("An error occurred while fetching the weather data.");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayWeather(data) {
    weatherDataEl.innerHTML = `
        <div class="icon">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
        </div>
        <div class="temperature">${data.main.temp}°C</div>
        <div class="description">${data.weather[0].description}</div>
        <div class="details">
            <div class="feels-like">Feels like: ${data.main.feels_like}°C</div>
            <div class="humidity">Humidity: ${data.main.humidity}</div>
            <div class="wind">Wind speed: ${data.wind.speed}m/s</div>
        </div>
    `
}