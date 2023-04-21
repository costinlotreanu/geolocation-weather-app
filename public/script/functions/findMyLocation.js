import {data, weather} from '../index.js';

export function findMyLocation() {
  // geolocation with Navigator API
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(`Geolocation is available`);
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      data.lat = lat;
      data.long = long;

      // Green circle added to Show Weather Button
      document.querySelector(`#weatherBtn`).classList.remove(`mark--red`);
      document.querySelector(`#weatherBtn`).classList.add(`mark--green`);
      
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

// ---------------------------- Leaflet API (map)---------------------------
// map set view centered on Romania
  let map = L.map('map').setView([45.9432, 24.9668], 6);
  
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);