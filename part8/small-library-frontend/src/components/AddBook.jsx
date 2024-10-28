import React from "react";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BOOK } from "../queries/queries";

// custom hook for input field
const useField = (type) => {
    const [value, setValue] = useState(undefined);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const inputProps = { type, value, onChange };

    const reset = () => setValue("");

    return { inputProps, reset };
};

const AddBook = () => {
    const [genreArray, setGenreArray] = useState([""]);

    const title = useField("text");
    const author = useField("text");
    const published = useField("number");
    const genre = useField("text");

    // define mutation for create book query
    const [createBook] = useMutation(CREATE_BOOK);

    const handleAddGenre = () => {
        if (genre.inputProps.value) {
            setGenreArray([...genreArray, genre.inputProps.value]);
            genre.reset();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createBook({
            variables: {
                title: title.inputProps.value,
                author: author.inputProps.value,
                published: Number(published.inputProps.value),
                genres: genreArray,
            },
        });

        setGenreArray([""]);

        title.reset();
        author.reset();
        published.reset();
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="title">title</label>
                    <input
                        id="title"
                        type={title.inputProps.type}
                        value={title.inputProps.value}
                        onChange={title.inputProps.onChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">author</label>
                    <input
                        id="author"
                        type={author.inputProps.type}
                        value={author.inputProps.value}
                        onChange={author.inputProps.onChange}
                    />
                </div>
                <div>
                    <label htmlFor="published">published</label>
                    <input
                        id="published"
                        type={published.inputProps.type}
                        value={published.inputProps.value}
                        onChange={published.inputProps.onChange}
                    />
                </div>
                <div>
                    <input
                        id="genre"
                        type={genre.inputProps.type}
                        value={genre.inputProps.value}
                        onChange={genre.inputProps.onChange}
                    />
                    <button type="button" onClick={handleAddGenre}>
                        add genre
                    </button>
                </div>
                <div>
                    genres: <span>{genreArray.join(", ")}</span>
                </div>
                <button type="submit">create book</button>
            </form>
        </div>
    );
};

export default AddBook;