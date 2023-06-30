import express from "express";
import patientService from "../services/patientService";
import {toEntry, toPatient} from "../utils";
import {Entry, Patient} from "../types";

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

router.post('/:id/entries', (req, res) => {
  const newEntry: Entry = toEntry(req.body);
  const newReturnPatient = patientService.addEntry(newEntry, req.params.id);
  res.json(newReturnPatient);
});

export default router;
