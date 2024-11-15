import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries/queries";
import { useState } from "react";

const Books = () => {
    const [filteredGenre, setFilteredGenre] = useState("all genres");

    const books = useQuery(ALL_BOOKS);

    if (books.loading) return <>Loading...</>;

    const allBooks = books.data.allBooks.filter((book) => {
        // keep only the books that includes the genres of filteredGenre
        return filteredGenre === "all genres"
            ? book
            : book.genres.includes(filteredGenre);
    });

    const genres = books.data.allBooks.map((book) => book.genres);

    const getUniqueGenres = (array) => {
        const obj = {};

        for (const subarray of array) {
            for (const item of subarray) {
                // if the item exists, increment with 1
                if (obj[item]) {
                    obj[item] += 1;
                }

                // if the item doesnt exist, initialize with 1
                if (!obj[item]) {
                    obj[item] = 1;
                }
            }
        }

        return obj;
    };

    const uniqueGenres = [
        "all genres",
        ...Object.keys(getUniqueGenres(genres)),
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
                        <b>{filteredGenre}</b>
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
                    {allBooks.map((book, index) => {
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
                        value={genre}
                        onClick={(e) => handleButton(e)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Books;
