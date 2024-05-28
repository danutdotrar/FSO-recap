import { useSelector, useDispatch } from "react-redux";
import { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import { filterChange } from "./reducers/filterReducer";
import VisibilityFilter from "./components/VisibilityFilter";

// App
const App = () => {
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
