import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query AllBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            published
            author {
                name
                born
                bookCount
            }
            genres
        }
    }
`;

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author {
            name
            born
            bookCount
        }
        genres
    }
`;

export const FIND_BOOK = gql`
    query findBookByGenre($genre: String) {
        findBook(genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
    mutation CreateBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author {
                name
                born
                bookCount
            }
            published
            genres
        }
    }
`;

export const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String, $setBornTo: Int) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const ME = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`;
