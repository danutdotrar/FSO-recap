import React from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

export const Authors = () => {
    const [name, setName] = useState("");
    const [born, setBorn] = useState("");

    const authors = useQuery(ALL_AUTHORS);

    const [editAuthor] = useMutation(EDIT_AUTHOR);

    const handleSubmit = (e) => {
        e.preventDefault();

        editAuthor({
            variables: { name, setBornTo: Number(born) },
            refetchQueries: [{ query: ALL_AUTHORS }],
        });

        setName("");
        setBorn("");
    };

    if (authors.loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Authors</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.data.allAuthors.map((author) => {
                        return (
                            <tr key={author.name}>
                                <td style={{ textAlign: "start" }}>
                                    {author.name}
                                </td>
                                <td>{author.born}</td>
                                <td>{author.bookCount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h2>Set birthyear</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="born">born</label>
                    <input
                        id="born"
                        type="number"
                        value={born}
                        onChange={(e) => setBorn(e.target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    );
};
