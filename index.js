const express = require('express');
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;
require('dotenv').config();

console.log(process.env);

const Datastore = require('nedb');
const database = new Datastore( { filename: 'database.db'});
database.loadDatabase();

app.listen(port, () => console.log('Listening on 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;

  database.insert(data);
  response.send(data);
});

app.get('/api', (request, response) => {
  database.find({}, (err, docs) => {
    if(err) {
      response.end();
      return;
    } else response.send(docs);
  });
});
const apikey = process.env.API_KEY;
const fields = 'temp%2Cfeels_like%2Chumidity%2Cwind_speed%2Cprecipitation_type%2Cprecipitation%2Cvisibility%2Cweather_code';

app.get('/weather/:latlon', async (request, response) => {
const latlon = request.params.latlon.split(',');
console.log(latlon);
const lat = latlon[0];
const lon = latlon[1];
const weather_apiURL = `https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${lon}&fields=${fields}&apikey=${apikey}`;
const weather_resp = await fetch(weather_apiURL);
const weather_data = await weather_resp.json();

const air_apiURL = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
const air_resp = await fetch(air_apiURL);
const air_data = await air_resp.json();

const data = {
  weather: weather_data,
  air_quality: air_data,
}

response.send(data);
//console.log(data);
});
