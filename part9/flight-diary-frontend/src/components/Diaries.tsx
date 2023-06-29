import diaryService from "../services/diaryService";
import {NonSensitiveDiaryEntry} from "../types";
import {useEffect, useState} from "react";

export const Diaries = ({change}: {change: boolean}) => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  useEffect(() => {
      diaryService.getAll().then(response => setDiaries(response));
  }, [change]);
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.date}>
          <h3>{diary.date}</h3>
          visibility: {diary.visibility}
          <br />
          weather: {diary.weather}
        </div>
      ))}
    </div>
  );
};
