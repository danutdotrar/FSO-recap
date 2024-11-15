import React from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";

export const Authors = () => {
    const [born, setBorn] = useState("");

    const authors = useQuery(ALL_AUTHORS);

    const authorsOptions = authors?.data?.allAuthors
        // .filter((author) => !author.born)
        .map((author) => {
            return { ...author, label: author.name, value: author.name };
        });

    const [selectedOption, setSelectedOption] = useState(null);

    const [editAuthor] = useMutation(EDIT_AUTHOR);

    const handleSubmit = (e) => {
        e.preventDefault();

        editAuthor({
            variables: { name: selectedOption.name, setBornTo: Number(born) },
            refetchQueries: [{ query: ALL_AUTHORS }],
        });

        setSelectedOption(null);
        setBorn("");
    };

    if (authors.loading) return <div>Loading...</div>;

    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: "black",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "black",
        }),
    };

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
                <div style={{ maxWidth: "250px" }}>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={authorsOptions}
                        styles={customStyles}
                        isClearable
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
