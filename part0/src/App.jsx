import React from "react";

const Hello = ({ name }) => {
    return <div>Hello {name}</div>;
};

const App = () => {
    const friends = [
        { name: "Peter", age: 4 },
        { name: "Maya", age: 10 },
    ];

    return (
        <>
            <div>
                <p>{friends[0].name + " " + friends[0].age}</p>
            </div>
        </>
    );
};

export default App;
