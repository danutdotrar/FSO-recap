// takes the body of the request

import { NewPatientEntry } from "./types";

// take each field and check if the type is correct
// use typeguard
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    const patient: NewPatientEntry = {
        name: "test",
        dateOfBirth: "22-02-2222",
        ssn: "2324234",
        gender: "male",
        occupation: "Firefighted",
    };

    return patient;
};
