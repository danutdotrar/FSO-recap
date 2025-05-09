import { z } from "zod";
import { Gender, NewPatientEntry } from "./types";

// type guard
// const isString = (text: unknown): text is string => {
//     return typeof text === "string" || text instanceof String;
// };

// const parseName = (name: unknown): string => {
//     if (!name || !isString(name)) {
//         throw new Error("Invalid or missing data: " + name);
//     }

//     return name;
// };

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };
// const parseDate = (date: unknown): string => {
//     if (!date || !isString(date) || !isDate(date)) {
//         throw new Error("Invalid or missing data: " + date);
//     }

//     return date;
// };

// const parseSsn = (ssn: unknown): string => {
//     if (!ssn || !isString(ssn)) {
//         throw new Error("Invalid or missing data: " + ssn);
//     }

//     return ssn;
// };

// const isGender = (gender: string): gender is Gender => {
//     const isValidGender = Object.values(Gender)
//         .map((item) => item.toString())
//         .includes(gender);

//     return isValidGender;
// };
// const parseGender = (gender: unknown): Gender => {
//     if (!gender || !isString(gender) || !isGender(gender)) {
//         throw new Error("Invalid or missing data: " + gender);
//     }

//     return gender;
// };

// const parseOccupation = (occupation: unknown): string => {
//     if (!occupation || !isString(occupation)) {
//         throw new Error("Invalid or missing data: " + occupation);
//     }

//     return occupation;
// };

// refactor to use zod object schema
const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

const toNewPatientEntry = (entry: unknown): NewPatientEntry => {
    return newPatientSchema.parse(entry);
};

export default toNewPatientEntry;
