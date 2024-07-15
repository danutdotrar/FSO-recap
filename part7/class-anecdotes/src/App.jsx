import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anecdotes: [],
            current: 0,
        };
    }

    componentDidMount = () => {
        axios.get("http://localhost:3000/anecdotes").then((response) => {
            this.setState({ anecdotes: response.data });
        });
    };

    render() {
        if (this.state.anecdotes.length === 0) {
            return <div>no anecdotes...</div>;
        }

        return (
            <div>
                <h1>anecdote of the day</h1>
            </div>
        );
    }
}

export default App;
