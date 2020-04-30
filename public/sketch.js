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
    document.getElementById('wDescription').textContent = `The weather here today is ${json.weather_code.value}. \n
    The temperature is ${json.temp.value}${json.temp.units} and it feels like ${json.feels_like.value}. Humidity is ${json.humidity.value}${json.humidity.units} and the wind speed is ${json.wind_speed.value}${json.wind_speed.units}`;
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
