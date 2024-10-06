
//Arrayet inneholder byene og deres bredde/lengdegrad
//fetchWeather funksjonen henter værdata fra API
//DisplayWeather viser værinfo

const weatherContainer = document.getElementById('weather-container');


const locations = [
    { name: "Athens, Greece", lat: 37.9838, lon: 23.7275 },
    { name: "Los Angeles, USA", lat: 34.0522, lon: -118.2436 },
    { name: "Bali, Indonesia", lat: -8.4095, lon: 115.1889 },
    { name: "Copenhagen, Denmark", lat: 55.6760, lon: 12.5683 },
    { name: "Mallorca, Spain", lat: 39.5716, lon:2.6505 }
];

function fetchWeather(location) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(location.name, data.current_weather);  
        })
        .catch(error => console.error('Error fetching weather data:', error));
}


function displayWeather(city, weather) {
    const weatherBox = document.createElement('div');  
    weatherBox.classList.add('weather-box');

    weatherBox.innerHTML = `
        <h2>${city}</h2>
        <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
        <p><strong>Windspeed:</strong> ${weather.windspeed} km/h</p>
        <p><strong>Wind Direction:</strong> ${weather.winddirection}°</p>
    `;

    weatherContainer.appendChild(weatherBox);  
}


function updateWeather() {
    weatherContainer.innerHTML = '';  

    locations.forEach(location => {
        fetchWeather(location);  
    });
}


updateWeather();


setInterval(updateWeather, 60000);  
