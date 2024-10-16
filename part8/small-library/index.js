const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { v4: uuid } = require("uuid");

let authors = [
    {
        name: "Robert Martin",
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: "Martin Fowler",
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963,
    },
    {
        name: "Fyodor Dostoevsky",
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821,
    },
    {
        name: "Joshua Kerievsky", // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: "Sandi Metz", // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
];

let books = [
    {
        title: "Clean Code",
        published: 2008,
        author: "Robert Martin",
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"],
    },
    {
        title: "Agile software development",
        published: 2002,
        author: "Robert Martin",
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ["agile", "patterns", "design"],
    },
    {
        title: "Refactoring, edition 2",
        published: 2018,
        author: "Martin Fowler",
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"],
    },
    {
        title: "Refactoring to patterns",
        published: 2008,
        author: "Joshua Kerievsky",
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "patterns"],
    },
    {
        title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
        published: 2012,
        author: "Sandi Metz",
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "design"],
    },
    {
        title: "Crime and punishment",
        published: 1866,
        author: "Fyodor Dostoevsky",
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "crime"],
    },
    {
        title: "Demons",
        published: 1872,
        author: "Fyodor Dostoevsky",
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "revolution"],
    },
];

// define the typeDefs schema
const typeDefs = `
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ) : Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ) : Author
    }
`;

// define the resolvers
const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            if (!args.author && !args.genre) {
                return books;
            }

            if (args.author && args.genre) {
                return books.filter(
                    (book) =>
                        book.author === args.author &&
                        book.genres.includes(args.genre)
                );
            }

            if (args.author) {
                const byAuthor = (book) => book.author === args.author;
                return books.filter(byAuthor);
            }

            if (args.genre) {
                const byGenre = (book) => book.genres.includes(args.genre);
                return books.filter(byGenre);
            }
        },
        allAuthors: () => {
            const authorList = authors.map((author) => {
                // filter the books by author name
                const bookCount = books.filter(
                    (book) => book.author === author.name
                );

                return {
                    name: author.name,
                    born: author.born,
                    bookCount: bookCount.length,
                };
            });

            return authorList;
        },
    },

    Mutation: {
        addBook: (root, args) => {
            // add the id to the new book
            const newBook = { ...args, id: uuid() };
            // add the book to the books list
            books = books.concat(newBook);

            // check if the author exists in the authors list
            const findAuthor = authors.find(
                (author) => author.name === newBook.author
            );

            // if the author doesn't exist, create new author for the authors
            if (!findAuthor) {
                const newAuthor = { name: newBook.author, id: uuid() };
                authors = authors.concat(newAuthor);
            }

            return newBook;
        },

        editAuthor: (root, args) => {
            const name = args.name;
            const bornYear = args.setBornTo;

            // find the author by the name
            const author = authors.find((author) => author.name === name);

            const updatedAuthor = { ...author, born: bornYear };

            if (author) {
                authors = authors.map((author) =>
                    author.name === name ? updatedAuthor : author
                );
            }

            return updatedAuthor;
        },
    },
};

// define the Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// start the server
startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
