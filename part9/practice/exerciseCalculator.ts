// Calculate the average time of daily exercise hours, compared to the target amount of daily hours.

// input - an array of 7 items, each index represents a day
// each day has a number of hours of exercise
// a target of daily amount of exercise (h)
// define metric to see how well the hours are met - from 1 to 3
// return object

// iterate over the array of days
// count number of days where exercised
// sum the hours
// find average of daily hours exercised
// compare to the metric define
// return the result object

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (week: number[], target: number): Result => {
    let trainingDays: number = 0;
    let totalHours: number = 0;
    const periodLength = week.length;

    // for..of to have direct access to the item
    for (let day of week) {
        if (day > 0) {
            trainingDays++;
            totalHours += day;
        }
    }

    const average: number = totalHours / periodLength;

    // rating
    let success = false;
    let ratingDescription = "";
    let rating = 0;

    if (average > target) {
        success = true;
        ratingDescription = "much wow keep going";
        rating = 3;
    }

    if (average < target && average > 1) {
        success = false;
        ratingDescription = "not bad";
        rating = 2;
    }

    if (average < 1) {
        success = false;
        ratingDescription = "unhealthy - max level";
        rating = 1;
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

interface ArgsResult {
    target: number;
    daysTrained: number[];
}

// function to take in process.argv as parameter
// first index (process.argv[2] is the target
// rest of the array are the days - each day has a nr of hours
// check if the arguments are numbers
// throw new error if a day isn't a number
// return an object containing the target and the array with the hours/day

const parseArguments = (args: string[]): ArgsResult => {
    // extract and separate the target from the array
    // use the rest of the array as the week
    // args[2] will be the first parameter from the command line (the target)
    // args[3] will be the start of the array of days trained
    const target: number = Number(args[2]);
    const daysArr: string[] = args.slice(3);

    // iterate over days trained array
    // check if all items are numbers
    const daysTrained = daysArr.map((day) => {
        const currentHours = Number(day);

        if (isNaN(currentHours)) {
            throw new Error("Args must be numbers");
        }

        return currentHours;
    });

    return {
        target,
        daysTrained,
    };
};

// try catch block to handle errors
// the error parameter from the catch is 'unknown' type so we need to narrow it down to Error to be able to access error.message property
try {
    const { target, daysTrained } = parseArguments(process.argv);

    console.log(calculateExercises(daysTrained, target));
} catch (error: unknown) {
    let errorMessage = "Something bad happend.";

    // since error is type unknown, we must narrow it down to a specific type
    // check if error is instance of Error - to access the message property
    if (error instanceof Error) {
        errorMessage += ` ${error.message}`;
    }

    console.log(errorMessage);
}
