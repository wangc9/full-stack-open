import React, {useEffect, useState} from "react";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import diagnoseService from '../../services/diagnoses';
import patientService from '../../services/patients';
import {EntryWithoutId} from "../../types";

export const EntryForm = ({id, show, setShow}: {id: string, show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const types = [
    'OccupationalHealthcare',
    'HealthCheck',
    'Hospital'
  ];
  const checkingTypes = [
    'Healthy',
    'Low Risk',
    'High Risk',
    'Critical Risk'
  ];
  const checkValue = (name: string) => {
    switch (name) {
      case 'Healthy':
        return 0;
      case 'Low Risk':
        return 1;
      case 'High Risk':
        return 2;
      case 'Critical Risk':
        return 3;
      default:
        return 0;
    }
  };
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [employer, setEmployer] = useState<string>('');
  const [sickStart, setSickStart] = useState<string>('');
  const [sickEnd, setSickEnd] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');
  const [codes, setCodes] = useState<string[]>([]);
  const [dCodes, setDCodes] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    diagnoseService.getAllCodes().then(res => setCodes(res));
  }, []);

  const handleCodeChange = (event: SelectChangeEvent<typeof dCodes>) => {
    const {
      target: { value },
    } = event;
    setDCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const basic = {
        description,
        date,
        specialist,
        diagnosisCodes: dCodes,
      };
      if (type === 'HealthCheck') {
        const result: EntryWithoutId = {
          ...basic,
          type,
          healthCheckRating
        }
        const response = await patientService.addEntry(result, id);
        setReleaseDate('');
        setCriteria('');
        setType('');
        setEmployer('');
        setSickEnd('');
        setSickStart('');
        setHealthCheckRating(0);
        setDCodes([]);
        setSpecialist('');
        setDescription('');
        setDate('');
        setShow(!show);
        return response;
      } else if (type === 'OccupationalHealthcare') {
        if (sickStart !== '' && sickEnd !== '') {
          const result: EntryWithoutId = {
            ...basic,
            type,
            employerName: employer,
            sickLeave: {
              startDate: sickStart,
              endDate: sickEnd,
            },
          }
          const response = await patientService.addEntry(result, id);
          setReleaseDate('');
          setCriteria('');
          setType('');
          setEmployer('');
          setSickEnd('');
          setSickStart('');
          setHealthCheckRating(0);
          setDCodes([]);
          setSpecialist('');
          setDescription('');
          setDate('');
          setShow(!show);
          return response;
        } else {
          const result: EntryWithoutId = {
            ...basic,
            type,
            employerName: employer,
          }
          const response = await patientService.addEntry(result, id);
          setReleaseDate('');
          setCriteria('');
          setType('');
          setEmployer('');
          setSickEnd('');
          setSickStart('');
          setHealthCheckRating(0);
          setDCodes([]);
          setSpecialist('');
          setDescription('');
          setDate('');
          setShow(!show);
          return response;
        }
      } else {
        const result: EntryWithoutId = {
          ...basic,
          type: 'Hospital',
          discharge: {
            date: releaseDate,
            criteria,
          }
        }
        const response = await patientService.addEntry(result, id);
        setReleaseDate('');
        setCriteria('');
        setType('');
        setEmployer('');
        setSickEnd('');
        setSickStart('');
        setHealthCheckRating(0);
        setDCodes([]);
        setSpecialist('');
        setDescription('');
        setDate('');
        setShow(!show);
        return response;
      }
    } catch (error) {
      let errorMessage = 'ERROR:';
      if (error instanceof Error) {
        errorMessage += error.stack;
        setMessage(errorMessage);
        setTimeout(() => {
          setMessage('');
        }, 3000)
      }
    }

  };

  return (
    <div>
      <form onSubmit={submit}>
        {message && (
          <Alert severity="error">{message}</Alert>
        )}
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <Select
            labelId="entry-type"
            id="multiple-entry"
            value={type}
            onChange={(event) => {setType(event.target.value)}}
            input={<OutlinedInput label="Type" />}
            MenuProps={MenuProps}
          >
            {types.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name.toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <TextField
          id="description"
          label="description"
          value={description}
          onChange={(event) => {setDescription(event.target.value)}}
          type="text"
        />
        <br />
        <TextField
          id="entry-date"
          label="date"
          value={date}
          onChange={(event) => {setDate(event.target.value)}}
          type="date"
        />
        <br />
        <TextField
          id="specialist"
          label="specialist"
          value={specialist}
          onChange={(event) => {setSpecialist(event.target.value)}}
          type="text"
        />
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="codes-checkbox-label">Codes</InputLabel>
            <Select
              labelId="multi-codes-checkbox-label"
              id="codes-checkbox"
              multiple
              value={dCodes}
              onChange={handleCodeChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {codes.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={dCodes.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          {type === 'HealthCheck' && (
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="health-checking-label">Health Checking Rate</InputLabel>
              <Select
                labelId="health-checking"
                id="multiple-checking"
                value={healthCheckRating}
                onChange={(event) => {setHealthCheckRating(Number(event.target.value))}}
                input={<OutlinedInput label="Type" />}
                MenuProps={MenuProps}
              >
                {checkingTypes.map((name) => (
                  <MenuItem
                    key={name}
                    value={checkValue(name)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {type === 'OccupationalHealthcare' && (
            <div>
              <TextField
                id="employer"
                label="Employer Name"
                value={employer}
                onChange={(event) => {setEmployer(event.target.value)}}
                type="text"
              />
              <br />
              Sick Leave:
              <br />
              <TextField
                id="start-date"
                label="Sick Leave Start Date"
                value={sickStart}
                onChange={(event) => {setSickStart(event.target.value)}}
                type="date"
              />
              {' '}
              <TextField
                id="end-date"
                label="Sick Leave End Date"
                value={sickEnd}
                onChange={(event) => {setSickEnd(event.target.value)}}
                type="date"
              />
            </div>
          )}
          {type === 'Hospital' && (
            <div>
              Discharge:
              <br />
              <TextField
                id="criteria"
                label="Criteria"
                value={criteria}
                onChange={(event) => {setCriteria(event.target.value)}}
                type="text"
              />
              <br />
              <TextField
                id="discharge-date"
                label="Discharge Date"
                value={releaseDate}
                onChange={(event) => {setReleaseDate(event.target.value)}}
                type="date"
              />
            </div>
          )}
          <Button
            id="new-entry-button"
            type="submit"
            color="primary"
            variant="contained"
          >
            <b>add</b>
          </Button>
        </div>
      </form>

    </div>
  )
}