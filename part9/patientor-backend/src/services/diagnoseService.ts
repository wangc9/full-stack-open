import {Diagnosis} from "../types";
import diagnoses from "../data/diagnoses";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getDiagnoseByCode = (code: string): Diagnosis | undefined => {
  return diagnoses.find((diagnose) => diagnose.code === code);
};

export default { getDiagnoses, getDiagnoseByCode };
