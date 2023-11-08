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
  port: 3306
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
  res.sendFile(__dirname + '/public/index.html');
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

app.get('/api/data', (req, res) => { // Method SELECT
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

app.delete('/api/delete/:id', (req, res) => { // Method DELETE
  const userId = req.params.id; // Set the user id
  console.log({ userId })
  const sql = 'DELETE FROM user1 WHERE username = ?';
  db.query(sql, [userId], (err, result) => { // Run the SQL query with the user id
    if (err) {
      console.error('Error deleting user from the database:', err);
      res.status(500).json({ error: 'Failed to delete user '});
    } else {
      res.json({ message: 'User deleted successfully'});
    }
  });
});


app.put('/api/update', (req, res) => {
  const { userId, username, password } = req.body;

  const sql = 'UPDATE user1 SET username = ?, password = ? WHERE id_user = ?';

  db.query(sql, [username, password, userId], (err, result) => {
    if (err) {
      console.error('Error updating user in the database', err);
      res.status(500).json({ error: 'Failed to update user' });
    } else {
      res.json({ message: 'User updated successfully' });
      console.log('Rota de atualização acionada');  
      console.log('User ID:', userId);
      console.log('New username:', username);
      console.log('New password:', password);
    }
  });
});



app.listen(port, () =>{
  console.log(`Service Running @ http://localhost:${port}`)
})