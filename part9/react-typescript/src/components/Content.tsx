import type { CoursePart } from "../App";

interface ContentProps {
    courseParts: CoursePart[];
}

interface PartProps {
    part: CoursePart;
    index: number;
}

// if we add a new type in a union/extend, exhaustive type checking will tell us if we also added it in the switch case
// used for checking if all the cases from a discriminated union are covered (a sum of types with a common field - 'kind')
// if a type exists in the type union but it's not covered/used, then the assertNever will throw an error
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part, index }: PartProps) => {
    switch (part.kind) {
        case "basic":
            return (
                <div key={index}>
                    <h3>{part.name}</h3>
                    <p>{part.description}</p>
                    <p>Exercises: {part.exerciseCount}</p>
                </div>
            );
            break;

        case "group":
            return (
                <div key={index}>
                    <h3>{part.name}</h3>
                    <p>Group projects: {part.groupProjectCount}</p>
                    <p>Exercises: {part.exerciseCount}</p>
                </div>
            );
            break;

        case "background":
            return (
                <div key={index}>
                    <h3>{part.name}</h3>
                    <p>{part.description}</p>
                    <a href={part.backgroundMaterial}>Material</a>
                    <p>Exercises: {part.exerciseCount}</p>
                </div>
            );
            break;

        case "special":
            return (
                <div key={index}>
                    <h3>{part.name}</h3>
                    <p>{part.description}</p>
                    <p>Requirments: {part.requirements.join(", ")}</p>
                    <p>Exercises: {part.exerciseCount}</p>
                </div>
            );
            break;

        default:
            // check if all cases are covered
            // if a new object with new 'kind' is added and it is not processed in the switch cases, then this function will throw an error
            return assertNever(part);
            break;
    }
};

const Content = ({ courseParts }: ContentProps) => {
    return (
        <>
            {courseParts.map((part, index) => (
                <Part part={part} index={index} />
            ))}
        </>
    );
};

export default Content;
