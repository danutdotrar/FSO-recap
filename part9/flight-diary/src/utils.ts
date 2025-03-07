import { NewDiaryEntry, Visibility, Weather } from "./types";

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

// type guard
const isVisibility = (visibility: string): visibility is Visibility => {
    return Object.values(Visibility)
        .map((item) => item.toString())
        .includes(visibility);
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error("No input or input is wrong format: " + visibility);
    }

    return visibility;
};

// validate external data input
// check if input object is matching NewDiaryEntry type
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if (
        "date" in object &&
        "weather" in object &&
        "visibility" in object &&
        "comment" in object
    ) {
        const newDiaryEntry: NewDiaryEntry = {
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            comment: parseComment(object.comment),
        };

        return newDiaryEntry;
    }

    throw new Error("Incorrect data: some fields are missing");
};

export default toNewDiaryEntry;
