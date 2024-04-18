import { useState, useEffect } from "react";

import noteService from "./services/notes";
import loginService from "./services/login";

import Note from "./components/Note";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

const App = () => {
    const [notes, setNotes] = useState(null);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loginVisible, setLoginVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const responseData = await noteService.getAll();

            setNotes(responseData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        // check if there is a user in local storage
        // if user exists, save it in user state
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create new noteObject
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: (notes.length + 1).toString(),
        };

        const responseData = await noteService.create(noteObject);

        // Concat noteObject to notes state
        setNotes(notes.concat(responseData));

        // reset newNote value
        setNewNote("");
    };

    const handleInputChange = (e) => {
        setNewNote(e.target.value);
    };

    const toggleImportance = async (id) => {
        // find the note with the id of the clicked note
        const note = notes.find((note) => note.id === id);

        // make a copy of that note and change what we want to change
        const changedNote = { ...note, important: !note.important };

        try {
            // update backend with axios method
            const responseData = await noteService.update(id, changedNote);

            // update App state
            setNotes(
                notes.map((note) => (note.id !== id ? note : responseData))
            );
        } catch (eror) {
            setErrorMessage(
                `the note '${note.content}' was already deleted from server`
            );
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            setNotes(notes.filter((n) => n.id !== id));
        }
    };

    const deleteNote = async (id) => {
        // use remove request from services
        await noteService.remove(id);

        setNotes(notes.filter((note) => note.id !== id));
    };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true);

    // do not render anything if notes are null
    if (!notes) return null;

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            // POST request for login
            const user = await loginService.login({ username, password });

            //  save the user in local storage
            window.localStorage.setItem(
                "loggedNoteappUser",
                JSON.stringify(user)
            );

            // set the token of the user for HTTP requests
            noteService.setToken(user.token);
            setUser(user);

            setUsername("");
            setPassword("");
            console.log("login OK");
        } catch (error) {
            setErrorMessage("Wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

        console.log("logging in with ", username, password);
    };

    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? "none" : "" };
        const showWhenVisible = { display: loginVisible ? "" : "none" };

        return (
            <>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>
                        log in
                    </button>
                </div>

                <div style={showWhenVisible}>
                    <LoginForm
                        handleSubmit={handleLogin}
                        handleUsernameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        handlePasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                        username={username}
                        password={password}
                    />

                    <button onClick={() => setLoginVisible(false)}>
                        cancel
                    </button>
                </div>
            </>
        );
    };

    const noteForm = () => (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={newNote}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <button type="submit">save note</button>
            </div>
        </form>
    );

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {!user ? (
                loginForm()
            ) : (
                <div>
                    <p>{user.name} is logged in</p>
                    {noteForm()}
                </div>
            )}

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>

            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportance(note.id)}
                        deleteNote={() => deleteNote(note.id)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;
