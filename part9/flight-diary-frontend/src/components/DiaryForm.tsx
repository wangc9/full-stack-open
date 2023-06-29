import {useState} from "react";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import diaryService from "../services/diaryService";

export const DiaryForm = ({change, setChange}: {change: boolean, setChange: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService.createDiary({
      date,
      visibility,
      weather,
      comment,
    }).then(response => {
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
      setChange(!change);
      return response;
    })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <TextField
            id="date"
            label="date"
            value={date}
            onChange={(event) => {setDate(event.target.value)}}
            type="date"
          />
        </div>
        <br />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Visibility</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          >
            <FormControlLabel value="great" control={<Radio />} label="Great" />
            <FormControlLabel value="good" control={<Radio />} label="Good" />
            <FormControlLabel value="ok" control={<Radio />} label="Ok" />
            <FormControlLabel value="poor" control={<Radio />} label="Poor" />
          </RadioGroup>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Weather</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={visibility}
            onChange={(event) => setWeather(event.target.value)}
          >
            <FormControlLabel value="sunny" control={<Radio />} label="Sunny" />
            <FormControlLabel value="rainy" control={<Radio />} label="Rainy" />
            <FormControlLabel value="cloudy" control={<Radio />} label="Cloudy" />
            <FormControlLabel value="stormy" control={<Radio />} label="Stormy" />
            <FormControlLabel value="windy" control={<Radio />} label="Windy" />
          </RadioGroup>
        </FormControl>
        <br />
        <div>
          <TextField
            id="comment"
            label="comment"
            value={comment}
            onChange={(event) => {setComment(event.target.value)}}
            type="text"
          />
        </div>
        <br />
        <Button
          id="new-entry-button"
          type="submit"
          color="primary"
          variant="contained"
        >
          <b>add</b>
        </Button>
      </form>
    </div>
  )
};
