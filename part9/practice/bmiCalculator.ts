// Calculate BMI based on height and weight (cm and kg)

// height will be in cm
export const calculateBmi = (height: number, weight: number): string => {
    // body mass = mass kg / height ** 2

    // from cm to m
    const heightInMeters = height / 100;

    const bmi = weight / heightInMeters ** 2;

    if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal range";
    }

    if (bmi <= 18.4) {
        return "Underweight";
    }

    if (bmi >= 25) {
        return "Overweight";
    }

    return "Something bad happend.";
};

interface ArgvValues {
    value1: number;
    value2: number;
}

// catch, validate and return inputs
const processArgv = (args: string[]): ArgvValues => {
    if (args.length < 4) {
        throw new Error("Need more args");
    }

    // check if args are numbers
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
        };
    } else {
        // if not numbers, throw new error
        throw new Error("Args must be numbers");
    }
};

if (require.main === module) {
    try {
        const { value1, value2 } = processArgv(process.argv);
        console.log(calculateBmi(value1, value2));
        // error has default type of 'unknown'
        // we can't access error.message property unless we narrow down 'error', else TypeScript will throw an error, since it can't guarantee .message property exists in 'error'
    } catch (error: unknown) {
        let errorMessage = "Something bad happend.";

        // narrow/check if error is instance of Error
        if (error instanceof Error) {
            errorMessage += ` ${error.message}`;
        }
        console.log(errorMessage);
    }
}
