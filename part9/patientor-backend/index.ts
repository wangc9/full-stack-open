import express from 'express';
import diagnoseRouter from './src/routes/diagnoses';

const app = express();
app.use(express.json());
app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
