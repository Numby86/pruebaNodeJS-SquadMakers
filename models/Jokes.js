const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema(
    {
        joke: { type: String, unique: true, required: true }
    },
    {
        timestamps: true
    }
);

const Joke = mongoose.model("Joke", jokeSchema);

module.exports = Joke;
