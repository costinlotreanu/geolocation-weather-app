 accessData();

async function accessData() {
  const response = await fetch(`/viewData`);
  const data = await response.json();
  
  const viewDB = document.querySelector(`#viewDB`);
  viewDB.textContent = ``;

  // print database in broser window
  for ( let item of data) {
    const container = document.createElement('div');
    const location = document.createElement(`p`);
    const time = document.createElement(`p`);
    const info = document.createElement(`p`);
    const status = document.createElement(`p`);

    const localTime = new Date(item.timestamp).toLocaleString();
    
    time.classList.add(`database--title`)
    time.innerText = localTime;
    location.innerText = `Location: latitude ${item.lat}°, longitude ${item.long}°`;
    info.innerText = `Current Weather: temperature ${item.temperature}°C, windspeed ${item.windspeed} km/h, winddirection ${item.winddirection}°`;
    status.innerText = `Weather Status: ${item.status}`;

    viewDB.append(container);
    container.append(time, location, info, status);
  }
}