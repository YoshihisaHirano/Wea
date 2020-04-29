const express = require('express');
const app = express();
const port = 3000;

const Datastore = require('nedb');
const database = new Datastore;

app.listen(port, () => console.log('Listening on 3000'));
app.use(express.static('public'));
