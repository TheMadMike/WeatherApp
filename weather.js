const cityNameInput = document.getElementById('cityName');

function showWeather() {
    let cityName = cityNameInput.value;
    getWeatherForCity(cityName);
}

function getWeatherForCity(cityName) {
    let request = new XMLHttpRequest();

    const apiKey = '2460a70aa4ddf323987fb22827cc06e7';
    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+apiKey, )

    request.onload = function() {
        let data = JSON.parse(this.response);

        //check if http status code == OK
        if(data.cod == 200) {
            displayData(data);
        } else {
            alert(data.message);
        }
    }

    request.send();
}

function toCelsius(kelvin) {
    return (kelvin - 273);
}

function displayData(data) {
    document.getElementById('desc').innerHTML = `${data.weather[0].main} (${data.weather[0].description})`;
    document.getElementById('pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(toCelsius(data.main.temp))} &deg;C`;
    document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity} %`;
}