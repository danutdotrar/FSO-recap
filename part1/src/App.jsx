import React from "react";

const Hello = ({ name }) => {
    return <div>Hello {name}</div>;
};

const App = () => {
    const date = new Date().toISOString();

    const a = 10;
    const b = 20;

    return (
        <>
            <div>
                <p>LETS GET IT</p>
                <p>date: {date}</p>
                <p>sum of a + b = {a + b}</p>
            </div>
            <Hello name={"sharmola"} />
            <Hello name={"imi place sharmola"} />
            <Hello />
        </>
    );
};

export default App;
