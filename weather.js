document.onload = askForGeolocation();

const cityNameInput = document.getElementById('cityName');
const apiKey = '2460a70aa4ddf323987fb22827cc06e7';

document.getElementById("searchButton").onclick = showWeather;

function showWeather() {
    let cityName = cityNameInput.value;
    getWeatherForCity(cityName);
}

function askForGeolocation() {
    if(!navigator.geolocation) {
        console.log('Geolocation not supported.');
    } 
    
    else {
        navigator.geolocation.getCurrentPosition((position) => {

          getWeatherForCoordinates(position.coords.latitude, position.coords.longitude);

        }, () => { 
            console.log("Unable to retrieve user's location"); 
        });
    }
}

function getWeatherForCity(cityName) {
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);

    request.onload = function() {
        let data = JSON.parse(this.response);
        displayData(data);
    };

    request.send();
}

function getWeatherForCoordinates(latitude, longitude) {
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);

    request.onload = function() {
        let data = JSON.parse(this.response);
        displayData(data);
        cityNameInput.value = data.name;
    };

    request.send();
}

function toCelsius(kelvin) {
    return (kelvin - 273);
}

function displayData(data) {
    if(data.cod == 200) {
        document.getElementById('desc').innerHTML = `${data.weather[0].main} (${data.weather[0].description})`;
        document.getElementById('pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(toCelsius(data.main.temp))} &deg;C`;
        document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity} %`;
    }

    else {
        alert(data.message);
    }
}