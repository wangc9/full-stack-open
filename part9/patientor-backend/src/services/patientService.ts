import {Entry, Patient, secretPatient} from "../types";
import patients from "../data/patients";

const getPatients = (): Patient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, ssn, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
    entries
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

const addEntry = (entry: Entry, id: string): Patient => {
  const patient = patients.findIndex((patient) => patient.id === id);
  patients[patient].entries.push(entry);
  return patients[patient];
};

export default { getPatients, getPatientById, addPatient, addEntry };
