const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const Book = require("./models/book");
const Author = require("./models/author");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const { v4: uuid } = require("uuid");

// test mongodb connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to MongoDB ", MONGODB_URI);
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB: ", error));

// let authors = [
//     {
//         name: "Robert Martin",
//         id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//         born: 1952,
//     },
//     {
//         name: "Martin Fowler",
//         id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//         born: 1963,
//     },
//     {
//         name: "Fyodor Dostoevsky",
//         id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//         born: 1821,
//     },
//     {
//         name: "Joshua Kerievsky", // birthyear not known
//         id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//     },
//     {
//         name: "Sandi Metz", // birthyear not known
//         id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//     },
// ];

// let books = [
//     {
//         title: "Clean Code",
//         published: 2008,
//         author: "Robert Martin",
//         id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//         genres: ["refactoring"],
//     },
//     {
//         title: "Agile software development",
//         published: 2002,
//         author: "Robert Martin",
//         id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//         genres: ["agile", "patterns", "design"],
//     },
//     {
//         title: "Refactoring, edition 2",
//         published: 2018,
//         author: "Martin Fowler",
//         id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//         genres: ["refactoring"],
//     },
//     {
//         title: "Refactoring to patterns",
//         published: 2008,
//         author: "Joshua Kerievsky",
//         id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//         genres: ["refactoring", "patterns"],
//     },
//     {
//         title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//         published: 2012,
//         author: "Sandi Metz",
//         id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//         genres: ["refactoring", "design"],
//     },
//     {
//         title: "Crime and punishment",
//         published: 1866,
//         author: "Fyodor Dostoevsky",
//         id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//         genres: ["classic", "crime"],
//     },
//     {
//         title: "Demons",
//         published: 1872,
//         author: "Fyodor Dostoevsky",
//         id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//         genres: ["classic", "revolution"],
//     },
// ];

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
    author: Author!
    genres: [String!]!
    id: ID!
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
        ) : Book!
        
        editAuthor(
            name: String
            setBornTo: Int
            ) : Author
        }
        `;

// TODO next: 8.15
// define the resolvers
const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            // if (args.author) {
            //     const byAuthor = (book) => book.author === args.author;
            //     return books.filter(byAuthor);
            // }

            // if (args.genre) {
            //     const byGenre = (book) => book.genres.includes(args.genre);
            //     return books.filter(byGenre);
            // }

            if (!args.genre) {
                // return all books and populate the author field
                return await Book.find({}).populate("author");
            }

            if (args.genre) {
                const books = await Book.find({ genres: args.genre });
                return books;
            }
        },
        allAuthors: async () => {
            const authorList = await Author.find({});

            const bookList = await Book.find({}).populate("author");

            const authors = authorList.map((author) => {
                const filteredBooks = bookList.filter(
                    (book) => author.name === book.author.name
                );

                return {
                    name: author.name,
                    born: author.born || null,
                    bookCount: filteredBooks.length,
                };
            });

            return authors;
        },
    },

    Mutation: {
        addBook: async (root, args) => {
            // use args to get the parameters
            // take the args.author and check if author exists in Author collection
            // if there is no author, create new Author and save it
            // create new Book and add the ID of new created author + populate it
            // return the new saved book

            const isAuthor = await Author.findOne({ name: args.author });

            let author;
            // if there is no author then create new author and use its id in the new created book
            if (!isAuthor) {
                // create new Author
                author = new Author({
                    name: args.author,
                });
                // save the new author
                try {
                    await author.save();
                } catch (error) {
                    throw new GraphQLError("Saving author failed", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.author,
                            error,
                        },
                    });
                }
            }

            const authorID = !isAuthor ? author._id : isAuthor._id;

            // populate or other methods are async operations, so we need to await
            const book = await new Book({
                title: args.title,
                author: authorID,
                published: args.published,
                genres: args.genres,
            }).populate("author");

            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError("Saving book failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.title,
                        error,
                    },
                });
            }

            return book;
        },

        editAuthor: async (root, args) => {
            const name = args.name;
            const bornYear = args.setBornTo;

            // find and update the author with the new bornYear
            const updatedAuthor = await Author.findOneAndUpdate(
                { name: name },
                { born: bornYear },
                { new: true }
            );

            if (!updatedAuthor) {
                return null;
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
