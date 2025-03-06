import { NewDiaryEntry, Weather } from "./types";

// type guard - used for type narrowing (type narrowing is used to give a variable a more strict/accurate type)
// - the function returns a boolean and has a type predicate as the return type (`text is string` in our case)
// if the type guard function returns true, then TypeScript knows that the tested variable has the type that was defined in the type predicate
// when type guard returns true, TypeScript will know that the tested variable has the type that was defined in the type predicate

// comment
const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error("No input or input is wrong format: " + comment);
    }

    return comment;
};

// date
const isDate = (date: unknown): date is string => {
    return typeof date === "string";
};

const parseDate = (date: unknown): string => {
    // type narrowing - give a variable a more strict/accurate type
    if (!date || !isDate(date)) {
        throw new Error("No input or input is wrong format: " + date);
    }

    return date;
};

console.log(parseDate("as"), parseComment("as"));

// weather
const isWeather = (param: string): param is Weather => {
    return Object.values(Weather)
        .map((value) => value.toString())
        .includes(param);
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error("No input or input is wrong format: " + weather);
    }

    return weather;
};

// validate external data input
// check if input object is matching NewDiaryEntry type
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    console.log(object);
    const newDiaryEntry: NewDiaryEntry = {
        date: "",
        weather: parseWeather("sunny"),
        visibility: "great",
        comment: "fake - for testing",
    };

    return newDiaryEntry;
};

export default toNewDiaryEntry;
