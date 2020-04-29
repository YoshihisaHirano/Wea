const userposition = {};

if('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(position => {
    userposition.lat = position.coords.latitude.toFixed(2);
    userposition.lon = position.coords.longitude.toFixed(2);
    document.getElementById('lat').textContent = userposition.lat;
    document.getElementById('lon').textContent = userposition.lon;
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
