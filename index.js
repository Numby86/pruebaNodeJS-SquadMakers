const express = require("express");
const axios = require("axios");
const jokesRouter = require('./routes/jokes.routes.js');
const numbersRouter = require('./routes/numbers.routes.js');
const connect = require('./utils/db/connect.js');
const cors = require('cors');
const createError = require('./utils/errors/create-errors.js');

connect();

const PORT = 3000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/jokes', jokesRouter);
server.use('/numbers', numbersRouter);

server.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    const joke = response.data.value;
    res.json({ joke });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

server.use('*', (req, res, next) => {
  next(createError('Esta ruta no existe', 404));
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

module.exports = server;