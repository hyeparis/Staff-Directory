const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

app.get('/api/staff', (req, res) => {
    connection.query(
      "SELECT * FROM employee",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.get('/api/positions', (req, res) => {
  connection.query(
    "SELECT * FROM positions",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.delete('/api/staff/:id', (req, res) => {
  let sql = 'UPDATE employee SET position_id = 0 WHERE id = ' + req.params.id;
  connection.query(
    sql, (err, rows, fields) => {
      res.send(rows);
    }
  )
});
app.listen(port, () => console.log(`listening on port ${port}`));
