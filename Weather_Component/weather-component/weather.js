// takes the values from the API
function getWeather(e) {
    e.preventDefault();

    const apiKey = 'APIkey';
    const city = document.getElementById('cityInput').value;
    const lang = 'en';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;
    const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `
                <h4 class="text-center text-danger"> No city found </h4>
            `;
            console.log('Errore nella richiesta:', error);
        });
    
    fetch(hourlyForecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data);
        })
        .catch(error => {
            console.log('Errore nella richiesta:', error);
        });
}

// sets the first letter to uppercase
function capitalizeFirstLetter(string) {
    return string.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
}

// sets the html component
function setCardHTML(data) {
    return component = `
        <div class="card col-3">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" class="border-bottom" alt="Icona meteo">
            <div class="card-body">
                <h5 class="card-title"> ${capitalizeFirstLetter(data.weather[0].description)} </h5>
                <p class="card-text"> Temperature: ${data.main.temp}°C <br>
                Humidity: ${data.main.humidity}% <br>
                Pressure: ${data.main.pressure} hPa </p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item text-center"> ${(data.dt_txt === undefined)? 'Right now' : data.dt_txt} </li>
            </ul>
        </div>
    `;
}

// view weather data right now
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h3 class="text-center col-12"> Current weather situation in ${data.name} </h3>
        ${setCardHTML(data)}
    `;
}

// view the hourly forecast for the next 2 hours
function displayHourlyForecast(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (data.list && data.list.length > 0) {
        const forecasts = data.list.slice(0, 2);
        let forecastHTML = '';
        forecasts.forEach(forecast => {
            forecastHTML += setCardHTML(forecast);
        });
        weatherInfo.innerHTML += forecastHTML;
    }
}
