import {Diagnosis, Patient} from "../../types";
import diagnoseService from '../../services/diagnoses';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import TransgenderIcon from '@mui/icons-material/Transgender';
import {useEffect, useState} from "react";

export const PatientDetail = ({patient}: {patient: Patient}) => {
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
          {entry.date} <i>{entry.description}</i>
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
      ))}
    </div>
  )
};
