import express from "express";
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

router.get('/:code', (req, res) => {
  const code = req.params.code;
  res.send(diagnoseService.getDiagnoseByCode(code));
});

router.get('/codes/all', (_req, res) => {
  res.send(diagnoseService.getCodes());
});

export default router;
