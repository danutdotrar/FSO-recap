import { z } from "zod";
import { NewPatientSchema } from "./utils";

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

// TypeScript only checks if we have all the required fields or not, but excess fields are not prohibited
// TypeScript doens't modify the actaul data. We need to exclude the fields ourselves
export type NonSensitivePatients = Omit<Patients, "ssn">;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
