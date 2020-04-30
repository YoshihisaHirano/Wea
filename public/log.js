getData();

async function getData() {
  const resp = await fetch('/api');
  const result = await resp.json();
  console.log(result);

  for(let item of result) {
    const root = document.createElement('p');

    const latitude = document.createElement('div');
    latitude.textContent = `Latitude: ${item.lat.toFixed(2)}`;

    const longitude = document.createElement('div');
    longitude.textContent = `Longitude: ${item.lon.toFixed(2)}`;

    const timestamp = document.createElement('div');
    const timeString = new Date(item.timestamp).toLocaleString();
    timestamp.textContent = timeString;

    root.append(latitude, longitude, timestamp);
    document.body.appendChild(root);
  }
}
