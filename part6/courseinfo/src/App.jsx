import { useSelector, useDispatch } from "react-redux";
import { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";

// App
const App = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state);

    return (
        <>
            <div>
                <NewNote />
                <Notes />
            </div>
        </>
    );
};

export default App;
