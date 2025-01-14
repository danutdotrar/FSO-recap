const { PubSub } = require("graphql-subscriptions");
// with subscriptions, the communication happens using the 'publish-subscribe' principle
const pubsub = new PubSub();

const { GraphQLError, subscribe } = require("graphql");

const Book = require("../models/book");
const Author = require("../models/author");

const User = require("../models/user");

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

            // if (!args.genre) {
            //     // return all books and populate the author field
            //     return await Book.find({}).populate("author");
            // }

            // if (args.genre) {
            //     const books = await Book.find({ genres: args.genre }).populate(
            //         "author"
            //     );
            //     return books;
            // }

            return await Book.find({}).populate("author");
        },
        findBook: async (root, args) => {
            if (!args.genre) {
                // return all books and populate the author field
                return await Book.find({}).populate("author");
            }

            if (args.genre) {
                const books = await Book.find({ genres: args.genre }).populate(
                    "author"
                );
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
        me: async (root, args, context) => {
            const currentUser = context.currentUser;
            console.log("current user", currentUser);

            if (!currentUser) {
                throw new GraphQLError("Wrong credentials", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                    },
                });
            }

            return currentUser;
        },
    },

    Mutation: {
        addBook: async (root, args, context) => {
            // use args to get the parameters
            // take the args.author and check if author exists in Author collection
            // if there is no author, create new Author and save it
            // create new Book and add the ID of new created author + populate it
            // return the new saved book

            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError("Wrong credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            const isAuthor = await Author.findOne({ name: args.author });

            let author;
            // if there is no author then create new author and use its id in the new created book
            if (!isAuthor) {
                // create new Author
                author = new Author({
                    name: args.author,
                });

                try {
                    // save the new author
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

            // publish a notification about the operation to all subscribers
            pubsub.publish("BOOK_ADDED", { bookAdded: book });

            return book;
        },

        editAuthor: async (root, args, context) => {
            const name = args.name;
            const bornYear = args.setBornTo;

            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError("Wrong credentials", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                    },
                });
            }

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

        createUser: async (root, args) => {
            // take username and favorite genre from the args
            // check if user already created
            const userExists = await User.findOne({ username: args.username });

            // if user already exists, return graphql error
            if (userExists) {
                throw new GraphQLError("Username already exists", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.username,
                    },
                });
            }

            // if user doesnt exists
            // create new user with new User model
            const newUser = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            });

            await newUser.save();

            // return new user
            return newUser;
        },

        login: async (root, args) => {
            // find the username in the User collection
            const user = await User.findOne({ username: args.username });

            // if no user, throw new graphql error
            // all users have the same password
            if (!user || args.password !== "secret") {
                throw new GraphQLError("Bad credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: user ? args.password : args.username,
                    },
                });
            }

            // if user, check for password
            // if user and pass match, create user obj to attach to jwtoken
            // the user obj will contain the username and user _id
            const userForToken = {
                username: user.username,
                id: user._id,
            };

            // use jwt sign to create a new token
            const token = jwt.sign(userForToken, process.env.JWT_SECRET);
            // return the new token based on Token gql schema {value: token}

            return { value: token };
        },
    },

    // with subscription, clients can listen to events in real time
    Subscription: {
        // the resolver for bookAdded subscriptions registers and saves info about all the clients that do the subscription
        bookAdded: {
            // the clients that subscribed are saved to "BOOK_ADDED" iterator object
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
        },
    },
};

module.exports = resolvers;
