import patientsEntries from "../../data/patients";
import { Patients, NonSensitivePatients } from "../types";

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

// we need a function that gets the object with the fields from the body of the request
// take each field and check if it has the correct type (parse/validate/narrow each field to have the right type)
// the return type of the function will be a new type of patients without 'id' field

export default { getPatientsEntries, getNonSensitivePatients };
