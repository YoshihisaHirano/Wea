getData();

async function getData() {
  const resp = await fetch('/api');
  const result = await resp.json();
  console.log(result);

  for(let item of result) {
    const root = document.createElement('p');

    const latitude = document.createElement('div');
    latitude.textContent = `Latitude: ${item.lat}`;

    const longitude = document.createElement('div');
    longitude.textContent = `Longitude: ${item.lon}`;

    root.append(latitude, longitude);
    document.body.appendChild(root);
  }
}
