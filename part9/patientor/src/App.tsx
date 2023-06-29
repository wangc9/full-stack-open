import {useEffect, useState} from "react";
import {Link, Route, Routes, useMatch} from "react-router-dom";
import axios from "axios";
import {Button, Container, Divider, Typography} from '@mui/material';

import {apiBaseUrl} from "./constants";
import {Patient} from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import {PatientDetail} from "./components/PatientListPage/Patient";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const match = useMatch('/patients/:id');
  const patient = match ? patients.find((patient) => patient.id === match.params.id) : null;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path='/patients/:id' element={<PatientDetail patient={patient as Patient} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
