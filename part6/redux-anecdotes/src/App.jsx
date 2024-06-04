import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdoteService";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(initializeAnecdotes());
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
