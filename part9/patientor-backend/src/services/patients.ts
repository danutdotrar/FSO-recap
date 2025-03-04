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

export default { getPatientsEntries, getNonSensitivePatients };
