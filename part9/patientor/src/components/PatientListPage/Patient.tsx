import {Patient} from "../../types";
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import TransgenderIcon from '@mui/icons-material/Transgender';

export const PatientDetail = ({patient}: {patient: Patient}) => {
  return (
    <div>
      <h2>{patient.name}</h2>
      {' '}
      {patient.gender === 'male' ? <ManIcon /> : (patient.gender === 'female' ? <WomanIcon /> : <TransgenderIcon />)}
      <br />
      ssn: {patient.ssn}
      <br />
      occupation: {patient.occupation}
    </div>
  )
};
