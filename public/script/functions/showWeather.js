import { weather, showWeatherMessage, showWeatherInfo } from '../index.js';

export function showWeather() {
  if (weather.length === 0) {
    showWeatherMessage(`infoAlert`, `Find Location first`, 1500);

    document.querySelector(`#weatherBtn`).classList.add(`mark--red`);

  } else {

    showWeatherMessage(`info`, `Sroll page down to see Weather Info`, 2000) 
    showWeatherInfo();
  }
}