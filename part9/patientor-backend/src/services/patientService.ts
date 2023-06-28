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

export default { getPatients };
