let months = [
    '/01/',
    '/02/',
    '/03/',
    '/04/',
    '/05/',
    '/06/',
    '/07/',
    '/08/',
    '/09/',
    '/10/',
    '/11/',
    '/12/'
];

let nameOfDay = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

let today = new Date();
let month = months[today.getMonth()];
let year = today.getFullYear();
let dayName = nameOfDay[today.getDay()];

function formatDate() {


    function formatHours() {
        let hours = today.getHours();
        if (hours > 9) {
            return hours;
        } else {
            return `0${hours}`;
        }
    }
    let hours = formatHours();

    function formatMinutes() {
        let minutes = today.getMinutes();
        if (minutes > 9) {
            return minutes;
        } else {
            return `0${minutes}`;
        }
    }
    let minutes = formatMinutes();

    function formatDate() {
        let dates = today.getDate();
        if (dates > 9) {
            return dates;
        } else {
            return `0${dates}`;
        }
    }
    let dates = formatDate();

    return (`${dates}${month}${year} ${dayName} ${hours}:${minutes}`);
}

let todayDate = document.querySelector('#today-date');
todayDate.innerHTML = formatDate();

let d = 0;
for (let i = 0; i < 5; i++) {

    let forecast = document.querySelector('#day' + i);
    let day = today.getDay() + i + 1;

    if (day > 6) {
        day = d;
        d = d + 1;
    }

    console.log(day);
    forecast.innerHTML = nameOfDay[day];

    //console.log(nameOfDay[today.getDay() + f]);
}


function showCurrentLocationTemp() {

    function retrievePosition(position) {
        let apiKey = "050e67e288ac84e9d900a2f0e0b10db2";
        // let apiKey2 = '0dee6c2ebee8d5ebb931bc857d688c14';
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        console.log(url);
        axios.get(url).then(showSearchTemp);
    }

    navigator.geolocation.getCurrentPosition(retrievePosition);
}



let btnCurrentLocations = document.querySelector('#currentLocation');
btnCurrentLocations.addEventListener('click', showCurrentLocationTemp);
// showCurrentLocationTemp();

function changeCityName(event) {
    event.preventDefault();
    let cityName = document.querySelector("#cityName");
    let searchCity = document.querySelector('#search-city-input');
    cityName.innerHTML = searchCity.value;

}


// let now = new Date();
// let time = now.getTime();
// now = new Date(time - (time % 86400000));

// let arr2 = [];

// for (let i = 0; i < 5; i++, now.setDate(now.getDate() + 1)) {
//     let day = (now.getDate());
//     let month = (now.getMonth() + 1);
//     if (day > 9) {
//         day = (now.getDate() + 1);
//     } else {
//         day = `0${(now.getDate() + 1)}`;
//     }
//     if (month > 9) {
//         month = (now.getMonth() + 1);
//     } else {
//         month = `0${(now.getMonth() + 1)}`;
//     }
//     arr2.push(day + '.' + month);
//     let forecastDate = document.querySelector('#date' + i);
//     forecastDate.innerHTML = "arr2[i]";
// }


function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "050e67e288ac84e9d900a2f0e0b10db2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function displayForecast(response) {
    let forecastWeather = response.data.daily;
    for (let i = 0; i < 5; i++) {
        let forecastMin = document.querySelector('#min' + i);
        forecastMin.innerHTML = Math.round(forecastWeather[i + 1].temp.min);
        let forecastMax = document.querySelector('#max' + i);
        forecastMax.innerHTML = Math.round(forecastWeather[i + 1].temp.max);
        let iconElement = document.querySelector('#iconForecast' + i);
        iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${forecastWeather[i+1].weather[0].icon}@2x.png`);
        iconElement.setAttribute("alt", forecastWeather[i + 1].weather[0].main);
    }

}



function showSearchTemp(response) {
    let h1 = document.querySelector("#todayTemperature");
    let temperature = Math.round(response.data.main.temp);
    h1.innerHTML = `${temperature}`;
    let city = document.querySelector('#cityName');
    city.innerHTML = response.data.name;
    let humidity = document.querySelector('#humidity');
    humidity.innerHTML = `${response.data.main.humidity}%`;
    let wind = document.querySelector('#wind');
    wind.innerHTML = `${Math.round(response.data.wind.speed)} `;
    let descriptionElement = document.querySelector('#description');
    descriptionElement.innerHTML = response.data.weather[0].description;
    let iconElement = document.querySelector('#icon');
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    celsiusTemperature = Math.round(response.data.main.temp);

    getForecast(response.data.coord);
}


function searchCity(city) {
    let apiKey = "050e67e288ac84e9d900a2f0e0b10db2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(showSearchTemp);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    searchCity(city);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity('Kyiv');




let celsiusTemperature = null;


function showFahr(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperature = document.querySelector('#todayTemperature');
    temperature.innerHTML = Math.round(fahrenheitTemperature);

}


let fahrTemp = document.querySelector('#fahrengeit');
fahrTemp.addEventListener('click', showFahr);



function showCelsium(event) {
    event.preventDefault();
    let temperature = document.querySelector('#todayTemperature');
    temperature.innerHTML = celsiusTemperature;

}

let celsiumTemp = document.querySelector('#celsium');
celsiumTemp.addEventListener('click', showCelsium);