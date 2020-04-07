const cityNameInput = document.getElementById('cityName');
const currentWeatherCtx = document.getElementById('current');

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
        if(data.cod == 200) {
            currentWeatherCtx.innerHTML = `${data.weather[0].main} (${data.weather[0].description}) <br>` ;
            currentWeatherCtx.innerHTML += `temp: ${Math.round(toCelsius(data.main.temp))} &deg;C`;
        } else {
            alert(data.message);
        }
    }

    request.send();
}

function toCelsius(kelvin) {
    return (kelvin - 273);
}