const express = require('express');
const app = express();

// Database NeDB
const Datastore = require('nedb');
const database = new Datastore({ filename: 'database.db' });

// loading database
database.loadDatabase();

const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(express.static(`public`));
// for receiving info from Client in JSON
app.use(express.json({ limit: '1mb' }));

app.post(`/api`, (req, res) => {
  console.log(req.body)
  const { lat, long, temperature, status, windspeed, winddirection } = req.body;
  const timestamp = Date.now();

  // inserting info in Database
  database.insert({ lat, long, timestamp, temperature, windspeed, winddirection, status });

  // respose to client
  res.json(
    {
      succes: 200,
      body: {
        timestamp,
        latitude: lat,
        longitude: long,
        temperature,
        windspeed,
        winddirection,
        status
      }
    }
  )

  console.log(`Post received from the client`);
  console.log(`Latitude: ${lat}, longitude: ${long}`)
})

// interogating entire database and send entries in JSON to endpoint
app.get(`/viewData`, (req, res) => {
  database.find({}, (err, data) => {
    res.json(data)
  })
})

// receiving from client params {lat, long} and forwaring to external OPEN METEO API
app.get('/weather/geolocation/:lat/:long', async (req, res) => {
  const { lat, long } = req.params;

  // converting string from parameters to numbers with max 4 digits (required by Weather API)
  const numLat = parseFloat(lat).toFixed(4);
  const numLong = parseFloat(long).toFixed(4);


  const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${numLat}&longitude=${numLong}` + 
  `&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,visibility&current_weather=true&timezone=auto`;

  fetch(weatherAPI)
    .then(response => response.json())
    .then(weatherData => res.json(weatherData))
    .catch(error => console.log(error))
})

app.listen(
  PORT,
  () => console.log(`The server is listening on http://localhost:${PORT}`)
)