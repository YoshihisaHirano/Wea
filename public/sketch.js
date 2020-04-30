const userposition = {};

if('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async (position) => {
    userposition.lat = position.coords.latitude;
    userposition.lon = position.coords.longitude;
    document.getElementById('lat').textContent = userposition.lat.toFixed(4);
    document.getElementById('lon').textContent = userposition.lon.toFixed(4);

    const resp = await fetch(`/weather/${userposition.lat},${userposition.lon}`);
    const json = await resp.json();
    console.log(json);
    const weather = json.weather;
    userposition.weather = weather;
    userposition.aq = json.air_quality;
    document.getElementById('weather').textContent = `The weather here today is ${weather.weather_code.value}. \n
    The temperature is ${weather.temp.value}${weather.temp.units} and it feels like ${weather.feels_like.value}. Humidity is ${weather.humidity.value}${weather.humidity.units} and the wind speed is ${weather.wind_speed.value}${weather.wind_speed.units}`;
    try {
      const aq = json.air_quality.results[0].measurements[0];
      document.getElementById('aq').textContent = `The air has ${aq.value}${aq.unit} of ${aq.parameter.toUpperCase()} in it.`;
    } catch(e) {
      document.getElementById('aq').textContent = '';
      console.log(e);
    }
  })
} else {
  console.log('boo');
}

const buttn = document.getElementById('submitButton');
buttn.addEventListener('click', async () => {
  if(userposition.lat) {
    const options = {
      method: 'POST',
      body: JSON.stringify(userposition),
      headers: {
      'Content-Type': 'application/json'
    },
    }
    const response = await fetch('/api', options);
    const answer = await response.json();
    console.log(answer);
  } else {
    buttn.textContent = 'Location unavailable :(';
  }
})
