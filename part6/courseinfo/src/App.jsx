import { useSelector, useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import noteService from "./services/notes";
import { useEffect } from "react";
import { setNotes } from "./reducers/noteReducer";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const response = await noteService.getAll();

            dispatch(setNotes(response));
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
