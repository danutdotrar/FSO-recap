import "./App.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        // super gives us access to 'this'
        // configures the properties and methods inherited from React.Component
        super(props);

        // state in class components is an object with multiple states if needed
        this.state = {
            anecdotes: [],
            current: 0,
        };
    }

    // execute after component is rendered
    componentDidMount = () => {
        axios.get("http://localhost:3000/anecdotes").then((response) => {
            this.setState({ anecdotes: response.data });
        });
    };

    // 'this' points to the current instance of the class
    handleClick = () => {
        const current = Math.floor(Math.random() * this.state.anecdotes.length);
        this.setState({ current });
    };

    render() {
        if (this.state.anecdotes.length === 0) {
            return <div>no anecdotes...</div>;
        }

        return (
            <div>
                <h1>anecdote of the day</h1>
                <div>{this.state.anecdotes[this.state.current].content}</div>
                <button onClick={this.handleClick}>next</button>
            </div>
        );
    }
}

export default App;
