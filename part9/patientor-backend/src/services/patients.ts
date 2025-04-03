import patientsEntries from "../../data/patients";
import { Patients, NonSensitivePatients, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPatientsEntries = (): Patients[] => {
    return patientsEntries;
};

// TypeScript only checks if we have all the required fields or not, but excess fields are not prohibited
// TypeScript doens't modify the actaul data. We need to exclude the fields ourselves
const getNonSensitivePatients = (): NonSensitivePatients[] => {
    return patientsEntries.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        })
    );
};

const addPatient = (patient: NewPatientEntry): Patients => {
    const id = uuid();

    // add patient to the database
    const newPatient = { id, ...patient };
    patientsEntries.push(newPatient);

    return newPatient;
};

export default { getPatientsEntries, getNonSensitivePatients, addPatient };
