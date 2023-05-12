const express = require("express");
const math = require("mathjs");
const numbersRouter = express.Router();

numbersRouter.get("/increment/:number", (req, res) => {
  const number = parseInt(req.params.number);

  if (isNaN(number)) {
    return res.status(400).json({ error: "Número proporcionado no válido" });
  }

  const result = number + 1;

  return res.status(200).json(result);
});

numbersRouter.get("/mcm/:numbers", (req, res) => {
  const numbers = req.params.numbers.split(",").map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: "Uno o más números no son válidos" });
  }

  const mcm = math.lcm(...numbers);

  return res.status(200).json(mcm);
});

module.exports = numbersRouter;
