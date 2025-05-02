import { Gender, NewPatientEntry } from "./types";

// type guard
const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Invalid or missing data: " + name);
    }

    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Invalid or missing data: " + date);
    }

    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Invalid or missing data: " + ssn);
    }

    return ssn;
};

const isGender = (gender: string): gender is Gender => {
    const isValidGender = Object.values(Gender)
        .map((item) => item.toString())
        .includes(gender);

    return isValidGender;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Invalid or missing data: " + gender);
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Invalid or missing data: " + occupation);
    }

    return occupation;
};

const toNewPatientEntry = (entry: unknown): NewPatientEntry => {
    if (!entry || typeof entry != "object") {
        throw new Error("Invalid or missing data.");
    }

    if (
        "name" in entry &&
        "dateOfBirth" in entry &&
        "ssn" in entry &&
        "gender" in entry &&
        "occupation" in entry
    ) {
        const newEntry: NewPatientEntry = {
            name: parseName(entry.name),
            dateOfBirth: parseDate(entry.dateOfBirth),
            ssn: parseSsn(entry.ssn),
            gender: parseGender(entry.gender),
            occupation: parseOccupation(entry.occupation),
        };

        return newEntry;
    }

    throw new Error("Invalid entry. Some fields are missing.");
};

export default toNewPatientEntry;
