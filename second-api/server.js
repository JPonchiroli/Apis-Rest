const express = require('express');
const app = express();
const port = 3000;

var nome = "João Ponchiroli"
var idade = parseInt(17);


app.get('/app/usuario', (req, res) => {
  res.json({message: `Nome: ${nome}, Idade: ${idade}`})
})

app.listen(port, () => {
  console.log(`Servidor Rodando em http://localhost:${port}`);
})