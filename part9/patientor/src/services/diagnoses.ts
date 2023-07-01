import axios from "axios";
import {Diagnosis} from "../types";

import {apiBaseUrl} from "../constants";

const getByCode = async (code: string) => {
  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnoses/${code}`
  );

  return data;
};

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses/`
  );

  return data;
};

const getAllCodes = async () => {
  const { data } = await axios.get<string[]>(
    `${apiBaseUrl}/diagnoses/codes/all`
  );

  return data;
}

export default {
  getByCode, getAll, getAllCodes
};

