import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
    const sumExercises = course.parts.reduce(
        (acc, val) => acc + val.exercises,
        0
    );

    return (
        <div>
            {course.parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
            <h3>{`total of ${sumExercises} exercises`}</h3>
        </div>
    );
};

export default Content;
