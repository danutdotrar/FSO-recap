import diaries from "../../data/diaryentries";
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const id = Math.max(...diaries.map((diary) => diary.id)) + 1;

    const newDiaryEntry = {
        id,
        ...entry,
    };

    diaries.push(newDiaryEntry);

    return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
    if (isNaN(id)) throw new Error("Invalid parameter");

    const entry = diaries.find((diary) => diary.id === id);
    return entry;
};

export default { getEntries, addDiary, getNonSensitiveEntries, findById };
