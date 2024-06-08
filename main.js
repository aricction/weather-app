const apiKey = '7751781a3c8c2020b981178e26bd1888';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const locationElement = document.getElementById('location');
const countryElement = document.getElementById('country');
const temperatureElement = document.getElementById('temperature');
const windElement = document.getElementById('wind');
const precipitationElement = document.getElementById('precipitation');
const humidityElement = document.getElementById('humidity');
const weatherIconElement = document.getElementById('weatherIcon');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value; 
    if (location) {
        fetchWeather(location);
    }
});

async function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`; 
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (data.cod === 200) {

            locationElement.textContent = data.name;
            countryElement.textContent = data.sys.country;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            precipitationElement.textContent = data.weather[0].description || 'No precipitation';
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            const windSpeedKmh = (data.wind.speed * 3.6).toFixed(1);
            windElement.textContent = `Wind Speed: ${windSpeedKmh} km/h`;

            const iconCode = data.weather[0].icon;
            weatherIconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIconElement.alt = data.weather[0].description;
        } else {
            locationElement.textContent = 'Location not found';
            temperatureElement.textContent = '';
            countryElement.textContent='';
            precipitationElement.textContent='';
            humidityElement.textContent='';
            windElement.textContent='';
        }
    } catch (error) {
        console.log(error);
    }
}
