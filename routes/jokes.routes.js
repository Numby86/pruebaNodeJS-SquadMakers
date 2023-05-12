const express = require("express");
const axios = require("axios");
const jokesRouter = express.Router();
const Joke = require("../models/Jokes.js");

jokesRouter.get("/type/:type", async (req, res) => {
  const jokeType = req.params.type;

  try {
    let urlApiJokes = "";

    if (jokeType === "Chuck") {
      urlApiJokes = "https://api.chucknorris.io/jokes/random";
    } else if (jokeType === "Dad") {
      urlApiJokes = "https://icanhazdadjoke.com/";
    } else {
      res.status(400).json({ error: "No tenemos chistes de ese tipo" });
      return;
    }

    const response = await axios.get(urlApiJokes, {
      headers: { Accept: "application/json" },
    });

    const joke = response.data.joke || response.data.value;
    res.json({ joke });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

jokesRouter.get("/allJokes", async (req, res) => {
  try {
    const jokes = await Joke.find();
    return res.status(200).json(jokes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

jokesRouter.get("/busca/:number", async (req, res) => {

  const number = req.params.number;
  try {
    const joke = await Joke.findOne({ numberJoke: number});
    if (joke) {
      return res.status(200).json(joke);
    } else {
      return res.status(404).json("No existe un chiste con ese id");
    }
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

jokesRouter.post("/newJoke", async (req, res) => {
  try {
    const newJoke = new Joke({ ...req.body });
    const createdJoke = await newJoke.save();
    return res.status(201).json(createdJoke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

jokesRouter.put("/updateJoke/:number", async (req, res) => {
  try {
    const number = req.params.number;
    const modifiedJoke = { ...req.body };
    
    const jokeUpdated = await Joke.updateOne(
      { numberJoke: number },
      { $set: modifiedJoke }
    );
    
    if (jokeUpdated.nModified === 0) {
      return res.status(404).json({ error: "Chiste no encontrado" });
    }
    
    return res.status(200).json({ message: "Chiste actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

jokesRouter.delete("/deleteJoke/:number", async (req, res) => {
  try {
    const number = req.params.number;
    
    const jokeDeleted = await Joke.deleteOne({ numberJoke: number });
    
    if (jokeDeleted.deletedCount === 0) {
      return res.status(404).json({ error: "Chiste no encontrado" });
    }
    
    return res.status(200).json({ message: "Chiste eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = jokesRouter;
