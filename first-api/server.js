const express = require('express'); // Importa o Express
const app = express(); // Define Rotas e Manipula Solicitações HTTP
const port = 3000; // Define a rota

app.get('/api/hello', (req, res) => { //Definindo Rota para rodar o código
  res.json({ message: 'Rodando Server 1' }) // Imprime no Json 
})

app.listen(port, () => {
  console.log(`Servidor Rodando em http://localhost:${port}`); // Mostra no console quando rodar o Server
})