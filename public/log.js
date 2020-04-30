const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

getData();

async function getData() {
  const resp = await fetch('/api');
  const result = await resp.json();
  console.log(result);
  const mymap = L.map('mapid').setView([0, 0], 1);
  const tiles = L.tileLayer(tileUrl, {
    attribution
  });
  tiles.addTo(mymap);

  for(let item of result) {
    const w = item.weather;
    const text = `The weather here today is ${w.weather_code.value}. <br> Outside it feels like ${w.feels_like.value}${w.feels_like.units}.`;
  //Adding markers on the map
  const marker = L.marker([item.lat, item.lon]).addTo(mymap);
  marker.bindPopup(text);
};
  //Adding entries in text format;
//   const root = document.createElement('p');
//   const latitude = document.createElement('div');
//   latitude.textContent = `Latitude: ${item.lat.toFixed(2)}`;
//   const longitude = document.createElement('div');
//   longitude.textContent = `Longitude: ${item.lon.toFixed(2)}`;
//   const timestamp = document.createElement('div');
//   const timeString = new Date(item.timestamp).toLocaleString();
//   timestamp.textContent = timeString;
//   root.append(latitude, longitude, timestamp);
//   document.body.appendChild(root);
}
