// Calculate BMI based on height and weight (cm and kg)

// height will be in cm
const calculateBmi = (height: number, weight: number): string => {
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
};

console.log(calculateBmi(180, 74));
