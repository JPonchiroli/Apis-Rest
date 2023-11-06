const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // Parse Data Submitted via HTML Forms

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/signup', (req, res) => {
  const user = req.body.user; // Extracts User Property from the request body

  res.json({ message: `Name stored: ${user}` });
});


app.listen(port, () => {
  console.log(`Service Running @ http://localhost:${port}`);
});
