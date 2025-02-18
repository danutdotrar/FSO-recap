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

const calculateExercises = (week: number[], target: number): Result => {
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

console.log(calculateExercises([3, 2, 2, 4.5, 0, 3, 1], 2));
