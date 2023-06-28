import express from 'express';
import {bmiCalculator} from "./bmiCalculator";
import {calculateExercise, parseWebExerciseArguments} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;
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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (daily_exercises === undefined || target === undefined) {
    res.status(404).send({
      error: "parameters missing",
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument
    const {value1, value2} = parseWebExerciseArguments(daily_exercises, target);
    const result = calculateExercise(value1, value2);
    res.send(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
