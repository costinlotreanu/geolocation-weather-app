import { findMyLocation } from './functions/findMyLocation.js';
import { saveInDb } from './functions/saveInDb.js';
import { showWeather } from './functions/showWeather.js';

const findBtn = document.querySelector(`#findBtn`);
const sendBtn = document.querySelector(`#sendBtn`);
const weatherBtn = document.querySelector(`#weatherBtn`);
const weatherMessage = document.querySelector(`#weatherMessage`);

// declaring data for storing location
export const data = {};
// declaring weather for storing weather info from Weather API
export const weather = [];


// -------------------- Main Processes of the Client Browser ----------------

findBtn.addEventListener(`click`, findMyLocation);
findBtn.addEventListener(`click`, ev => ev.target.disabled = true); // disable the findBtn after first click;
sendBtn.addEventListener(`click`, saveInDb);
weatherBtn.addEventListener(`click`, showWeather);
weatherBtn.addEventListener(`click`, storingWeatherInfo);

// --------------------------------------------------------------------------

// HELPER FUNCTION
export function showWeatherMessage(className, message, time) {
  weatherMessage.classList.add(className);
  weatherMessage.innerText = message;

  setTimeout(() => {
    weatherMessage.innerText = ``;
    weatherMessage.classList.remove(className);
  }, time)
}

export function showWeatherInfo() {
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

  data.temperature = temperature;
  data.status = text;
  data.windspeed = windspeed;
  data.winddirection = winddirection;
}
