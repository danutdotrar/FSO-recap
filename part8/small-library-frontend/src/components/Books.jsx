import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, FIND_BOOK } from "../queries/queries";
import { useState } from "react";

const Books = () => {
    const [filteredGenre, setFilteredGenre] = useState("");

    const books = useQuery(ALL_BOOKS);

    const { data, loading, error } = useQuery(FIND_BOOK, {
        variables: { genre: filteredGenre },
    });

    if (loading || books.loading) return <>Loading...</>;

    const booksFound = data?.findBook;

    const genres = books?.data?.allBooks?.map((book) => book.genres);

    const getUniqueGenres = (array) => {
        const obj = {};

        for (const subarray of array) {
            for (const item of subarray) {
                // if the item exists, increment with 1
                if (obj[item]) {
                    obj[item] += 1;
                }

                // if the item DOES NOT exist, initialize with 1
                if (!obj[item]) {
                    obj[item] = 1;
                }
            }
        }

        return obj;
    };

    const uniqueGenres = [
        { value: "", label: "all genres" },
        ...Object.keys(getUniqueGenres(genres)).map((genre) => {
            return { value: genre, label: genre };
        }),
    ];

    const handleButton = (e) => {
        const genre = e.target.value;
        setFilteredGenre(genre);
    };

    return (
        <div>
            <h1>Books</h1>

            <div>
                <p>
                    In genre:{" "}
                    <span>
                        <b>{filteredGenre || "all genres"}</b>
                    </span>
                </p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                </thead>
                <tbody>
                    {booksFound?.map((book, index) => {
                        return (
                            <tr key={index}>
                                <td style={{ textAlign: "start" }}>
                                    {book.title}
                                </td>
                                <td>{book.author.name}</td>
                                <td>{book.published}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div>
                {uniqueGenres.map((genre, index) => (
                    <button
                        key={index}
                        value={genre.value}
                        onClick={(e) => handleButton(e)}
                    >
                        {genre.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Books;
