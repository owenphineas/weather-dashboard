// 5 Day Forecast API call:
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// Coordinates generator call:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// API KEY
// 37827bf3895ac3606010a555012bb2a8

let searchBar = document.querySelector("#searchBar");
let currentCity = document.querySelector("#currentCity");
let cityName = "Atlanta";
let lat = 33.7489924 ;
let lon = -84.3902644;

function setDates() {
    currentCity.textContent = cityName + " (" + dayjs().format("M/D/YYYY") + ")";
    for(i = 0; i < 5; i++) {
        document.querySelector("#date" + [i + 1]).textContent = dayjs().add([i + 1], "day").format("M/D/YYYY");
    }
}



setDates();



// Convert entered city name to coords
function getCoords() {
    let locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchBar.value + "&limit=1&appid=37827bf3895ac3606010a555012bb2a8";
    fetch(locationURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        lat = data[0].lat;
        lon = data[0].lon;
        currentCity.textContent = data[0].name;
        getWeather();
    })

}

function getWeather() {
    let weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=37827bf3895ac3606010a555012bb2a8&units=imperial";
    let temp = document.querySelector("#temp");
    let wind = document.querySelector("#wind");
    let humidity = document.querySelector("#humidity");

    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.list[0].weather[0].main)
        // Displays current weather
        temp.textContent = "Temp: " + data.list[0].main.temp + "°F";
        wind.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
        humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
        // Displays 5 day forecast (weather data is in 3hr increments so 8 increments = 1 day)
        for(i = 8; i < 33; i+=8) {
            document.querySelector("#temp" + i / 8).textContent = "Temp: " + data.list[i].main.temp + "°F";
            document.querySelector("#wind" + i / 8).textContent = "Wind: " + data.list[i].wind.speed + " MPH";
            document.querySelector("#humidity" + i / 8).textContent = "Humidity: " + data.list[i].main.humidity + "%";
        }
        // Manually displays day 5 since list only goes to 39
        document.querySelector("#temp5").textContent = "Temp: " + data.list[39].main.temp + "°F";
        document.querySelector("#wind5").textContent = "Wind: " + data.list[39].wind.speed + " MPH";
        document.querySelector("#humidity5").textContent = "Humidity: " + data.list[39].main.humidity + "%";
    })
    
    
}

// Sets the default city to Atlanta when the page is loaded
function setDefaultCity() {
    searchBar.value = "Atlanta";
    getCoords();
}
setDefaultCity();

// Displays weather data for a city when its button is clicked
function cityButtons() {
    let cities = document.querySelector("#cities");
    for(i = 0; i < 8; i++) {
        cities.children[i].addEventListener("click", function() {
            searchBar.value = this.textContent;
            getCoords();
        }); 
    }
}
cityButtons();

let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", function() {
    getCoords();

});