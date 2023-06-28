import {DiagnoseEntry} from "../types";
import diagnoses from "../data/diagnoses";

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default { getDiagnoses };
