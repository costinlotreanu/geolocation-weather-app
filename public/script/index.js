const findBtn = document.querySelector(`#findBtn`);
const sendBtn = document.querySelector(`#sendBtn`);
const weatherBtn = document.querySelector(`#weatherBtn`);
const weatherMessage = document.querySelector(`#weatherMessage`);

// declaring data for storing your location
const data = {};
// declaring weather for storing weather info from Weather API
const weather = [];


// -------------------- Main Processes of the Client Browser ----------------

findBtn.addEventListener(`click`, findMyLocation);
sendBtn.addEventListener(`click`, saveInDb);
weatherBtn.addEventListener(`click`, showWeather);

// ---------------------------- Leaflet API (map)---------------------------
// map set view Romania
let map = L.map('map').setView([45.9432, 24.9668], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function findMyLocation() {
  // geolocation with Navigator API
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(`Geolocation is available`);
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      data.lat = lat;
      data.long = long;

      // Green circle added to Show Weather Button
      weatherBtn.classList.remove(`mark--red`);
      weatherBtn.classList.add(`mark--green`);
      
      // mark your position on LeafLet MAP 
      map.setView([lat, long], 13);
      let marker = L.marker([lat, long]).addTo(map);

      document.getElementById(`lat`).textContent = `Latitude ${lat.toFixed(2)}°`;
      document.getElementById(`long`).textContent = `Longitude ${long.toFixed(2)}°`;

      // send lat, long to receive weather info from server
      // server will connect later base on this info to third party Weather API
      sendLocation();

      async function sendLocation() {
        const response = await fetch(`/weather/geolocation/${lat}/${long}}`);
        const weatherData = await response.json();

        weather.push(weatherData);
      }
    })

  } else {
    console.log(`Geolocation is disabled`);
  }
}


function saveInDb(ev) {
  ev.preventDefault();  

  if ((typeof data.lat === `number`) && (typeof data.long === `number`)) {
    
    // POST method (sending latitude and longitude to server in JSON) for saving in DB
    const optionAPI = {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  fetch(`/api`, optionAPI)
    .then(response => response.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))

    showWeatherMessage(`info`, `Data has been sent`, 1500);
    
  } else {
    showWeatherMessage(`infoAlert`, `Find Location first`, 1200);
  }
}

function showWeather() {
  if (weather.length === 0) {
    showWeatherMessage(`infoAlert`, `Find Location first`, 1500);

    weatherBtn.classList.add(`mark--red`);

  } else {

    showWeatherMessage(`info`, `Sroll page down to see Weather Info`, 2000) 
    showWeatherInfo();
  }
}

// HELPER FUNCTION
function showWeatherMessage(className, message, time) {
  weatherMessage.classList.add(className);
  weatherMessage.innerText = message;

  setTimeout(() => {
    weatherMessage.innerText = ``;
    weatherMessage.classList.remove(className);
  }, time)
}

function showWeatherInfo() {
  const weatherData = weather[0].current_weather;
  const { temperature, time, weathercode, winddirection, windspeed } = weatherData;

  const date = new Date(time);

  const weatherItem = document.querySelectorAll(`#weatherItem`);

  weatherItem.forEach(elem => {
    elem.classList.add(`weather__item--margin`);
  })

  const weatherInfoContainer = document.querySelector(`#weatherInfoContainer`);
  weatherInfoContainer.style.position = `relative`;

  const weatherTitle = document.querySelector(`#weatherTitle`);
  const localTime = document.querySelector(`#localTime`);
  const currentTemp = document.querySelector(`#currentTemp`);
  const weatherCode = document.querySelector(`#weatherCode`);
  const windSpeed = document.querySelector(`#windSpeed`);
  const windDir = document.querySelector(`#windDir`);

  const currentTempTitle = document.querySelector(`#currentTempTitle`);
  const weatherCodeTitle = document.querySelector(`#weatherCodeTitle`);
  const windSpeedTitle = document.querySelector(`#windSpeedTitle`);
  const windDirTitle = document.querySelector(`#windDirTitle`);
  
  let text;

  switch(weathercode) {
    case 0: 
      text = `Clear sky`;
    break;
    case 1:
    case 2:
    case 3: 
      text = `Mainly clear, partly cloudy, and overcast`
      break;
    case 45:
    case 48:
      text = `Fog and depositing rime fog`;
      break;
    case 51:
    case 53:
    case 55:
      text = `Drizzle: Light, moderate, and dense intensity`;
      break;
    case 56:
    case 57:
      text = `Freezing Drizzle: Light and dense intensity`;
      break;
    case 61:
    case 63:
    case 65:
      text = `Rain: Slight, moderate and heavy intensity`;
      break;
    case 66:
    case 67:
      text = `Freezing Rain: Light and heavy intensity`;
      break;
    case 71:
    case 73:
    case 75:
      text = `Snow fall: Slight, moderate, and heavy intensity`;
      break;
    case 77:
      text = `Snow grains`;
      break;
    case 80:
    case 81:
    case 82:
      text = `Rain showers: Slight, moderate, and violent`;
      break;
    case 85:
    case 86:
      text = `Snow showers slight and heavy`;
      break;
    case 95:
      text = `Thunderstorm: Slight or moderate`;
      break;  
    case 96:
    case 99:
      text = `Thunderstorm with slight and heavy hail`;
      break;

    default: 
      text = `No status received`;
  }

  weatherTitle.innerText = `Weather Information`;
  localTime.innerText = date;
  currentTemp.innerText = `${temperature}°C`;
  weatherCode.innerText = text;
  windSpeed.innerText = `${windspeed} km/h`;
  windDir.innerText = `${winddirection}°`;

  currentTempTitle.innerText = `Current Temperature`;
  weatherCodeTitle.innerText = `Weather Status`;
  windSpeedTitle.innerText = `Wind Speed`;
  windDirTitle.innerText = `Wind Direction`;


  //storing value from Weather API in data for sending to Database on server
  data.temperature = temperature;
  data.status = text;
  data.windspeed = windspeed;
  data.winddirection = winddirection;
}