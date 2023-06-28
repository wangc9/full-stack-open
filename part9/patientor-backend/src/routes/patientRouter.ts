/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import {v1 as uuid} from 'uuid';
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  const {name, dateOfBirth, ssn, gender, occupation} = req.body;
  const newPatient = patientService.addPatient({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatient);
});

export default router;
