import React from "react";
import { ALL_AUTHORS } from "../queries/queries";
import { useQuery } from "@apollo/client";

export const Authors = () => {
    const authors = useQuery(ALL_AUTHORS);

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
        </div>
    );
};
