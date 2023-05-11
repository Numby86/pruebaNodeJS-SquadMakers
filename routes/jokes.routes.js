const express = require('express');
const axios = require('axios');
const jokesRouter = express.Router();
const Joke = require('../models/Jokes.js')

jokesRouter.get('/:type', async (req, res) => {
  const jokeType = req.params.type;

  try {
    let apiUrl = '';

    if (jokeType === 'Chuck') {
      apiUrl = 'https://api.chucknorris.io/jokes/random';
    } else if (jokeType === 'Dad') {
      apiUrl = 'https://icanhazdadjoke.com/';
    } else {
      res.status(400).json({ error: 'Invalid joke type' });
      return;
    }

    const response = await axios.get(apiUrl, {
      headers: { Accept: 'application/json' },
    });

    const joke = response.data.joke || response.data.value;
    res.json({ joke });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

jokesRouter.post('/newJoke', async (req, res) => {

    try {
      const newJoke = new Joke({ ...req.body });
      const createdJoke = await newJoke.save();
      return res.status(201).json(createdJoke);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

module.exports = jokesRouter;
