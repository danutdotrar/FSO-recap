import { useSelector, useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { useEffect } from "react";
import { setNotes, initializeNotes } from "./reducers/noteReducer";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(initializeNotes());
        };
        fetchData();
    }, []);

    return (
        <>
            <div>
                <NewNote />
                <VisibilityFilter />
                <Notes />
            </div>
        </>
    );
};

export default App;
