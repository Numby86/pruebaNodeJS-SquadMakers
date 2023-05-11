const express = require('express');

const PORT = 3000;
const server = express();


server.get('/', (req, res) => {
    res.json("Bienvenidx a chistes de Chuck Norris");
  })



server.listen(PORT, () => {
    console.log(`Listening in http://localhost:${PORT}`);
  });