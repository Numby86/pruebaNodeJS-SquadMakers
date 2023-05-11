const express = require("express");
const axios = require("axios");

const PORT = 3000;
const server = express();

const jokesRouter = require('./routes/jokes.routes.js');

server.use('/jokes', jokesRouter);

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

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
