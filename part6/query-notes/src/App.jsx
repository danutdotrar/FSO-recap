import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getNotes, createNote, updateNote } from "./services/requests";

const App = () => {
    const queryClient = useQueryClient();

    // new note mutation
    const newNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: (newNote) => {
            // manually update new note mutation
            const notes = queryClient.getQueryData(["notes"]);
            queryClient.setQueryData(["notes"], notes.concat(newNote));
        },
    });

    // update note mutation
    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const addNote = async (event) => {
        event.preventDefault();
        const content = event.target.note.value;
        event.target.note.value = "";

        newNoteMutation.mutate({ content, important: true });
    };

    const toggleImportance = (note) => {
        updateNoteMutation.mutate({ ...note, important: !note.important });
    };

    // retrieve notes from backend with React Query
    const result = useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
    });
    console.log(JSON.parse(JSON.stringify(result)));

    if (result.isLoading) {
        return <div>loading data...</div>;
    }

    const notes = result.data;

    return (
        <div>
            <h2>Notes app</h2>
            <form onSubmit={addNote}>
                <input name="note" />
                <button type="submit">add</button>
            </form>
            {notes.map((note) => (
                <li key={note.id} onClick={() => toggleImportance(note)}>
                    {note.content}
                    <strong> {note.important ? "important" : ""}</strong>
                </li>
            ))}
        </div>
    );
};

export default App;
