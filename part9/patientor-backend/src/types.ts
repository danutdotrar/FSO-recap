export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

// TypeScript only checks if we have all the required fields or not, but excess fields are not prohibited
// TypeScript doens't modify the actaul data. We need to exclude the fields ourselves
export type NonSensitivePatients = Omit<Patients, "ssn">;
