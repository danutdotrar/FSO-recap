import diagnosisEntries from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnosisEntries = (): Diagnosis[] => {
    return diagnosisEntries;
};

export default { getDiagnosisEntries };
