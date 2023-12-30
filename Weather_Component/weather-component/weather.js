// takes the values from the API
function getWeather(e) {
    e.preventDefault();

    const apiKey = undefined; // replace with API key
    const city = document.getElementById('cityInput').value;

    if (apiKey != undefined) {
        // API
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
                console.log('Error in the request:', error);
            });
        
        fetch(hourlyForecastUrl)
            .then(response => response.json())
            .then(data => {
                displayHourlyForecast(data);
            })
            .catch(error => {
                console.log('Error in the request:', error);
            });

    } else {
        // SIMULATION
        simulateWeatherAPI(city)
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                const weatherInfo = document.getElementById('weatherInfo');
                weatherInfo.innerHTML = `
                    <h4 class="text-center text-danger"> No city found </h4>
                `;
                console.log('Error in the request:', error);
            });
    
        simulateForecastAPI(city)
            .then(data => {
                displayHourlyForecast(data);
            })
            .catch(error => {
                console.log('Error in simulation:', error);
            });
    }
    
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
                <li class="list-group-item text-center"> ${(data.dt_txt === undefined)? 'Current' : data.dt_txt} </li>
            </ul>
        </div>
    `;
}

// view weather data right now
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h3 class="text-center col-12"> Weather situation in ${data.name} </h3>
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

// SIMULATION

// gets the current date
function getCurrentDate(n) {
    const data = new Date();
    const futureDate = new Date(data.getTime() + 3 * 60 * 60 * 1000 * n); // 3 ore in millisecondi

    let day, month, year, h;
    
    day = futureDate.getDate();
    month = (futureDate.getMonth() + 1) + '-';
    year = futureDate.getFullYear() + '-';

    h = futureDate.getHours() + ":";

    return year + month + day + ' ' + h + '00:00';
}

function simulateAPI(city, data = 0) {
    return {
        name: capitalizeFirstLetter(city),
        main: {
            temp: Math.floor(Math.random() * 30), // random temperature
            humidity: Math.floor(Math.random() * 100), // random humidity 
            pressure: Math.floor(Math.random() * 1000) // random pressure
        },
        weather: [
            {
                description: 'Cloudy', // description of time
                icon: '03d' // weather icon
            }
        ],
        dt_txt: (data != 0)? getCurrentDate(data) : undefined
    };
}

function simulateWeatherAPI(city) {
    const weatherData = simulateAPI(city);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(weatherData);
        }, 1000); // 1 second delay simulation
    });
}

function simulateForecastAPI(city) {
    const forecastData = {
        list: []
    };

    for (let i=0; i < 3; i++) {
        let el = simulateAPI(city, i+1);
        forecastData.list.push(el);
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(forecastData);
        }, 1000); // 1 second delay simulation
    });
}
