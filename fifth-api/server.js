const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

const db = mysql.createConnection({ // Create a Connection and Set the things
  host: 'localhost',
  user: 'joaop',
  password: '123',
  database: 'apiregister',
});

db.connect((err) => { // Try to Connect with Database
  if (err) {
    console.error('Error Connecting to MYSQL database' + err);
    return;
  }
  console.log('Connected to MYSQL database')
});

app.get('/register.html', (req, res) => {
  res.sendFile(__dirname + '/public/register.html')
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/register', (req, res) => { // Method INSERT/POST
  const user = req.body.user;
  const password = req.body.password;

  const sql = 'INSERT INTO user1 (username, password) VALUES (?,?)'; // SQL Syntax
  db.query(sql, [user, password], (err, result) => { // Set the value of the variable into database
    if (err) {
      console.error('Error Inserting user/password into the database:', err);
      res.json({error: 'Failed to insert user/password'});
    } else {
      res.redirect('/index.html');
      return;
    }  
  });
});

app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM user1';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error performing SELECT:', err);
      res.status(500).json({ error: 'Failed to retrieve data'});
    } else {
      res.json(results);
    }
  })
})

app.listen(port, () =>{
  console.log(`Service Running @ http://localhost:${port}`)
})