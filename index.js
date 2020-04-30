const express = require('express');
const app = express();
const fetch = require('node-fetch');
const port = 3000;

const Datastore = require('nedb');
const database = new Datastore( { filename: 'database1.db'});
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

const apikey = '';
const fields = 'temp%2Cfeels_like%2Chumidity%2Cwind_speed%2Cprecipitation_type%2Cprecipitation%2Cvisibility%2Cweather_code';

app.get('/weather/:latlon', async (request, response) => {
const latlon = request.params.latlon.split(',');
console.log(latlon);
const lat = latlon[0];
const lon = latlon[1];
const apiURL = `https://api.climacell.co/v3/weather/realtime?lat=55.713249700000006&lon=37.7474116&fields=${fields}&apikey=${apikey}`;
const resp = await fetch(apiURL);
const data = await resp.json();
response.send(data);
//console.log(data);
});
