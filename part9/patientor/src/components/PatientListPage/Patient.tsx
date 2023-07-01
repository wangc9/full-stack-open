import {Diagnosis, Entry, HealthCheckRating, Patient} from "../../types";
import diagnoseService from '../../services/diagnoses';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import TransgenderIcon from '@mui/icons-material/Transgender';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import ErrorIcon from '@mui/icons-material/Error';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import React, {useEffect, useState} from "react";
import {EntryForm} from "./EntryForm";

const healthData = (health: HealthCheckRating) => {
  switch (health) {
    case HealthCheckRating.LowRisk:
      return (
        <div>
          <ErrorIcon />
        </div>
      );
    case HealthCheckRating.HighRisk:
      return (
        <div>
          <ErrorIcon /> <ErrorIcon />
        </div>
      );
    case HealthCheckRating.CriticalRisk:
      return (
        <div>
          <ErrorIcon /> <ErrorIcon /> <ErrorIcon />
        </div>
      );
    case HealthCheckRating.Healthy:
      return (
        <div>
          <FavoriteIcon />
        </div>
      );
    default:
      return (
        <div>
          <QuestionMarkIcon />
        </div>
      );
  }
};



export const PatientDetail = ({patient, show, setShow}: {patient: Patient, show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [name, setName] = useState<string[]>([]);
  const [codes, setCodes] = useState<Diagnosis[]>([]);
  const getDiagnose = async (code: string) => {
    const result = await diagnoseService.getByCode(code);
    return result.name;
  };

  useEffect(() => {
    const getDiagnoses = async () => {
      const result = await diagnoseService.getAll();
      return result
    };
    getDiagnoses().then(res => setCodes(res));
  }, []);

  const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <div>
            {entry.date} <HealthAndSafetyIcon />
            <br />
            {entry.description}
            <br />
            {healthData(entry.healthCheckRating)}
            <br />
            diagnosed by {entry.specialist}
            <br />
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  const name = codes.find((d) => d.code === code);
                  return (<li key={code}>{code} {name?.name}</li>)
                })}
              </ul>
            )}
          </div>
        );
      case "Hospital":
        return (
          <div>
            {entry.date} <LocalHospitalIcon />
            <br />
            {entry.description}
            <br />
            diagnosed by {entry.specialist}
            <br />
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  const name = codes.find((d) => d.code === code);
                  return (<li key={code}>{code} {name?.name}</li>)
                })}
              </ul>
            )}
            <br />
            discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            {entry.date} <WorkIcon /> {entry.employerName}
            <br />
            {entry.description}
            <br />
            diagnosed by {entry.specialist}
            <br />
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  const name = codes.find((d) => d.code === code);
                  return (<li key={code}>{code} {name?.name}</li>)
                })}
              </ul>
            )}
            <br />
            {entry.sickLeave && (
              <div>
                Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div>
            No data available
          </div>
        );
    }
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      {' '}
      {patient.gender === 'male' ? <ManIcon /> : (patient.gender === 'female' ? <WomanIcon /> : <TransgenderIcon />)}
      <br />
      ssn: {patient.ssn}
      <br />
      occupation: {patient.occupation}
      <h3>Entries</h3>
      {patient.entries.map((entry) => (
        <div key={Math.floor(Math.random() * 1000000)}>
          <EntryDetails entry={entry} />
        </div>
      ))}
      <h3>Add New Entry</h3>
      <EntryForm id={patient.id} show={show} setShow={setShow} />
    </div>
  )
};
