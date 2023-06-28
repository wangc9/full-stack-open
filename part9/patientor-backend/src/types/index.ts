export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: gender;
  occupation: string;
}

export enum gender{
  Male = "male",
  Female = "female",
  Other = "other",
}

export type secretPatient = Omit<PatientEntry, 'id'>;
