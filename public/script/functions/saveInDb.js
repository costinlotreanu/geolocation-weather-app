import { showWeatherMessage, data } from "../index.js";

export function saveInDb(ev) {
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