import express from "express";
import patientService from "../services/patientService";
import {toPatient} from "../utils";
import {Patient} from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
  const newPatient: Patient = toPatient(req.body);
  const newReturnPatient = patientService.addPatient(newPatient);
  res.json(newReturnPatient);
});

export default router;
