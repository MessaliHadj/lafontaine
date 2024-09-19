const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const mysqlClient = mysql.createPool({
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT
});

async function createTable() {
  try {
    const connection = await mysqlClient.getConnection();
    await connection.query('CREATE TABLE IF NOT EXISTS values (number INTEGER)');
    connection.release();
  } catch (err) {
    console.error('Error creating table:', err);
  }
}

createTable();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/values/all', async (req, res) => {
  try {
    const [rows] = await mysqlClient.query('SELECT * FROM values');
    res.send(rows);
  } catch (err) {
    console.error('Error fetching values:', err);
    res.status(500).send({ error: 'Failed to retrieve values' });
  }
});

app.post('/values', async (req, res) => {
  const value = req.body.value;
  if (!value) {
    return res.status(400).send({ error: 'Missing value in request body' });
  }

  try {
    await mysqlClient.query('INSERT INTO values(number) VALUES(?)', [value]);
    res.send({ working: true });
  } catch (err) {
    console.error('Error inserting value:', err);
    res.status(500).send({ error: 'Failed to insert value' });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error('Api-Server startup error:', err);
  } else {
    console.log(`Api-Server listening on port ${port}`);
  }
});
