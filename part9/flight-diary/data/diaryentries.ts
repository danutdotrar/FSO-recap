import { DiaryEntry } from "../src/types";
import toNewDiaryEntry from "../src/utils";

const data = [
    {
        id: 1,
        date: "2017-01-01",
        weather: "rainy",
        visibility: "poor",
        comment: "Pretty scary flight, I'm glad I'm alive",
    },
    {
        id: 2,
        date: "2017-04-01",
        weather: "sunny",
        visibility: "good",
        comment: "Everything went better than expected, I'm learning much",
    },
    {
        id: 3,
        date: "2017-04-15",
        weather: "windy",
        visibility: "good",
        comment: "I'm getting pretty confident although I hit a flock of birds",
    },
    {
        id: 4,
        date: "2017-05-11",
        weather: "cloudy",
        visibility: "good",
        comment: "I almost failed the landing but I survived",
    },
];

const diaryEntries: DiaryEntry[] = data.map((obj) => {
    // use toNewDiaryEntry to validate and check if all fields correspond
    // 'as' is used for Type Assertion - tells TypeScript that an object has a specific type
    // when using type assertion, TypeScript will trust us and skips type checking, assuming that the value is of the specified type
    // tells TypeScript to treat toNewDiaryEntry(obj) as a DiaryEntry type
    // since toNewDiaryEntry(obj) has no id, we need to add it manually to the object to match the DiaryEntry type
    const object = toNewDiaryEntry(obj) as DiaryEntry;
    object.id = obj.id;

    return object;
});

export default diaryEntries;
