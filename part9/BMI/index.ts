import express from 'express';
import {bmiCalculator} from "./bmiCalculator";

const app = express();

app.get('/bmi', (req, res) => {
  let weight = req.query.weight;
  let height = req.query.height;
  if (weight === null || height === null || isNaN(Number(weight)) || isNaN(Number(height))) {
    res.send({
      error: "malformatted parameters",
    });
  } else {
    const bmi = bmiCalculator(Number(height), Number(weight));
    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
