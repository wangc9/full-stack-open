import axios from "axios";
import {NewDiary, NonSensitiveDiaryEntry} from "../types";

const baseURL = 'http://localhost:3001';

const getAll = () => {
    return axios.get<NonSensitiveDiaryEntry[]>(`${baseURL}/api/diaries`).then(response => response.data);
};

const createDiary = (object: NewDiary) => {
    return axios.post<NewDiary>(`${baseURL}/api/diaries`, object).then(response => response.data);
};

export default {getAll, createDiary};
