import {Patient, secretPatient} from "../types";
import patients from "../data/patients";

const getPatients = (): secretPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, ssn}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: Patient): secretPatient => {
  patients.push(patient);
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    ssn: patient.ssn
  };
};

export default { getPatients, getPatientById, addPatient };
