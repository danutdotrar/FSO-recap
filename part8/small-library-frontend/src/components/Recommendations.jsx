import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, ME } from "../queries/queries";

const Recommendations = () => {
    // execute the 'me' query to get the details of the current user
    // filter books by that genre
    const user = useQuery(ME);
    const { data, loading } = useQuery(ALL_BOOKS);

    if (loading) return <>Loading...</>;

    const allBooks = data?.allBooks;

    const username = user?.data?.me?.username;
    const favoriteGenre = user?.data?.me?.favoriteGenre;

    const filteredBooks = allBooks?.filter((book) =>
        book.genres.includes(favoriteGenre)
    );

    return (
        <>
            <h1>Recommendations</h1>
            <div>
                <p>hello, {username}!</p>
                <p>books in your favorite genre: {favoriteGenre}</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>
                            <b>author</b>
                        </td>
                        <td>
                            <b>published</b>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks?.map((book, index) => (
                        <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Recommendations;
