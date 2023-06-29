import {Diaries} from "./components/Diaries";
import {DiaryForm} from "./components/DiaryForm";
import {useState} from "react";
import {Container} from "@mui/material";

const App = () => {
  const [change, setChange] = useState<boolean>(false);
  return (
    <Container>
      <h1>Add new entry</h1>
      <DiaryForm setChange={setChange} change={change}/>
      <Diaries change={change}/>
    </Container>
  )
}

export default App;
