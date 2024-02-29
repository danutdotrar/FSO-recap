import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => (
                <div key={course.id}>
                    <Header course={course} />
                    <Content course={course} />
                </div>
            ))}
        </div>
    );
};

export default Course;
