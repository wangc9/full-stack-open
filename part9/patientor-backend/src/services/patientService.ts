import {PatientEntry} from "../types";
import patients from "../data/patients";

const getPatients = (): Omit<PatientEntry, 'ssn'>[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: PatientEntry): Omit<PatientEntry, 'ssn'> => {
  patients.push(patient);
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };
};

export default { getPatients, addPatient };
