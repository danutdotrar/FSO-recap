import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries/queries";

const Books = () => {
    const books = useQuery(ALL_BOOKS);

    if (books.loading) return <>Loading...</>;

    return (
        <div>
            <h1>Books</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                </thead>
                <tbody>
                    {books.data.allBooks.map((book) => {
                        return (
                            <tr key={book.title + book.author}>
                                <td style={{ textAlign: "start" }}>
                                    {book.title}
                                </td>
                                <td>{book.author}</td>
                                <td>{book.published}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
