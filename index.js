const express = require('express');
const app = express();
const port = 3000;

const Datastore = require('nedb');
const database = new Datastore( { filename: 'database.db'});
database.loadDatabase();

app.listen(port, () => console.log('Listening on 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) => {
  const data = request.body;
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
