type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number => {
    switch (op) {
        case "multiply":
            return a * b;
        case "add":
            return a + b;
        case "divide":
            if (b === 0) {
                throw new Error("can't divide by 0");
            }
            return a / b;
        default:
            throw new Error("Operation is not add/multiply/divide");
    }
};

try {
    console.log(calculator(3, 5, "multiply"));
} catch (error) {
    let errorMessage = "Something went wrong: ";

    // error will be the type 'unknown', so we need to check it and narrow it to a more specific type
    // the 'error' is narrowed so we can refer to error.message
    // checking if error is an instance of Error class
    // if it is an instance, then we can access error.message
    // without narrowing, TypeScript will throw an error because it cannot guarantee that error has the 'message' property
    if (error instanceof Error) {
        errorMessage += error.message;
    }

    console.log(errorMessage);
}
