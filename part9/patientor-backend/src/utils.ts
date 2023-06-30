import {
  Diagnosis,
  Discharge,
  Entry,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
  SickLeave
} from "./types";
import {v1 as uuid} from 'uuid';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing ssn');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing ssn');
  }

  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing ssn');
  }

  return employerName;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect gender: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  console.log('exist', !object);
  console.log('type', typeof object !== 'object');
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  console.log('code', object);
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isSickLeave = (sickLeave: object): boolean => {
  const keys = Object.keys(sickLeave);
  return keys.length === 2 && isDate(sickLeave[keys[0] as keyof typeof sickLeave]) && isDate(sickLeave[keys[1] as keyof typeof sickLeave]);
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object' || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect sick leave ' + sickLeave);
  }
  return {
    startDate: sickLeave[Object.keys(sickLeave)[0] as keyof typeof sickLeave],
    endDate: sickLeave[Object.keys(sickLeave)[1] as keyof typeof sickLeave],
  };
};

const isDischarge = (discharge: object): boolean => {
  const keys = Object.keys(discharge);
  console.log('length', keys.length === 2);
  console.log('first', isDate(discharge[keys[0] as keyof typeof discharge]));
  console.log('second', isString(discharge[keys[1] as keyof typeof discharge]));
  return keys.length === 2 && isDate(discharge[keys[0] as keyof typeof discharge]) && isString(discharge[keys[1] as keyof typeof discharge]);
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object' || !isDischarge(discharge)) {
    throw new Error('Incorrect discharge ' + discharge);
  }
  return {
    date: discharge[Object.keys(discharge)[0] as keyof typeof discharge],
    criteria: discharge[Object.keys(discharge)[1] as keyof typeof discharge],
  };
};

export const toPatient = (object: unknown): Patient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const id = uuid();
    const newEntry: Patient = {
      id,
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newEntry;
  }
  throw new Error('A field is missing!');
};

export const toEntry = (object: unknown): Entry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object) {
    const id = uuid();
    const basic = {
      id,
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };
    if ('diagnosisCodes' in object) {
      const basicWithCode = {
        ...basic,
        diagnosisCodes: parseDiagnosisCodes(object)
      };
      if ('type' in object) {
        if (object.type === 'HealthCheck') {
          if ('healthCheckRating' in object) {
            const healthCheckEntry: HealthCheckEntry = {
              ...basicWithCode,
              type: 'HealthCheck',
              healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            };
            return healthCheckEntry;
          }
          throw new Error('ERROR: Health Check Rating is missing!');
        } else if (object.type === 'OccupationalHealthcare') {
          if ('employerName' in object) {
            if ('sickLeave' in object) {
              const result: OccupationalHealthcareEntry = {
                ...basicWithCode,
                type: 'OccupationalHealthcare',
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
              };
              return result;
            } else {
              const result: OccupationalHealthcareEntry = {
                ...basicWithCode,
                type: 'OccupationalHealthcare',
                employerName: parseEmployerName(object.employerName),
              };
              return result;
            }
          }
          throw new Error('ERROR: employer name is missing!');
        } else if (object.type === 'Hospital') {
          if ('discharge' in object) {
            const result: HospitalEntry = {
              ...basicWithCode,
              type: 'Hospital',
              discharge: parseDischarge(object.discharge),
            };
            return result;
          }
          throw new Error('ERROR: discharge is missing!');
        } else {
          throw new Error('ERROR: Incorrect type');
        }
      }
      throw new Error('ERROR: Type is missing!');
    }
    if ('type' in object) {
      if (object.type === 'HealthCheck') {
        if ('healthCheckRating' in object) {
          const healthCheckEntry: HealthCheckEntry = {
            ...basic,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return healthCheckEntry;
        }
        throw new Error('ERROR: Health Check Rating is missing!');
      } else if (object.type === 'OccupationalHealthcare') {
        if ('employerName' in object) {
          if ('sickLeave' in object) {
            const result: OccupationalHealthcareEntry = {
              ...basic,
              type: 'OccupationalHealthcare',
              employerName: parseEmployerName(object.employerName),
              sickLeave: parseSickLeave(object.sickLeave)
            };
            return result;
          } else {
            const result: OccupationalHealthcareEntry = {
              ...basic,
              type: 'OccupationalHealthcare',
              employerName: parseEmployerName(object.employerName),
            };
            return result;
          }
        }
        throw new Error('ERROR: employer name is missing!');
      } else if (object.type === 'Hospital') {
        if ('discharge' in object) {
          const result: HospitalEntry = {
            ...basic,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge),
          };
          return result;
        }
        throw new Error('ERROR: discharge is missing!');
      } else {
        throw new Error('ERROR: Incorrect type');
      }
    }
    throw new Error('ERROR: Type is missing');
  }
  throw new Error('ERROR: Something basic is missing');
};
