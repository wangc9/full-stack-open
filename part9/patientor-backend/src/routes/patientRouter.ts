import express from "express";
import patientService from "../services/patientService";
import {toPatientEntry} from "../utils";
import {PatientEntry} from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  const newPatient: PatientEntry = toPatientEntry(req.body);
  const newReturnPatient = patientService.addPatient(newPatient);
  res.json(newReturnPatient);
});

export default router;
