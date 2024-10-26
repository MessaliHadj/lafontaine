const express = require('express');
const cors = require('cors');
const DB = require('./db.config')
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('*', (req, res) => {
  res.status(501).send('How can I help you ?');
});

DB.authenticate()
  .then(()=> console.log('The connection to database well done.'))
  .then(()=> {
    app.listen(port, (err) => {
      if (err) {
        console.error('Api-Server startup error:', err);
      } else {
        console.log(`Api-Server listening on port ${port}`);
      }
    });
  })
  .catch(err => console.log('Database error : ', err))