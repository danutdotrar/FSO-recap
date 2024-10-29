// GraphQL is an query language, which executes the queries based on a schema, and returns only the data we need
// GraphQL is used for implementing the interfaces servers offers for browsers, and in general the integration between different applications on the web.
// The main principle of GraphQL is that the code on the browsers form a 'query' describing the data we wanted, and sends it to the API with an HTTP POST request.
// All GraphQL queries are POST requests
// GraphQL needs a schema, which describes the data sent between the client and the server
// Fields marked with exclamation mark must be given a value
// Every GraphQL schema describes a Query, which tells what kind of queries can be made to the API
// GraphQL describes only the data moving between the server and the client
// On the database/server, the data can be organized in any way.

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const { v1: uuid } = require("uuid");

const jwt = require("jsonwebtoken");

// connect to mongodb
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Person = require("./models/person");
const User = require("./models/user");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to ", MONGODB_URI);

// connect to mongodb
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("connected to MongoDB"))
    .catch((error) =>
        console.log("error conencting to MongoDB: ", error.message)
    );

// define typeDefs - schema needed for GraphQL
const typeDefs = `
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type User {
        username: String!
        friends: [Person!]!
        id: ID!
    } 

    type Token {
        value: String!
    }

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person

        editNumber(
            name: String!
            phone: String!
        ): Person

        createUser(
            username: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }

    enum YesNo {
        YES
        NO
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person]!
        findPerson(name: String!): Person
        me: User
    }
`;

// define the resolvers
// the resolvers correspond to the queries described in the schema
const resolvers = {
    Query: {
        personCount: async () => {
            return Person.collection.countDocuments();
        },
        allPersons: async (root, args) => {
            // const byPhone = (person) =>
            //     args.phone === "YES" ? person.phone : !person.phone;

            // return persons.filter(byPhone);

            if (!args.phone) {
                return Person.find({});
            }

            return Person.find({ phone: { $exists: args.phone === "YES" } });
        },
        findPerson: async (root, args) => {
            return Person.findOne({ name: args.name });
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },

    Person: {
        address: (root) => {
            return { city: root.city, street: root.street };
        },
    },

    Mutation: {
        addPerson: async (root, args) => {
            // create new Person with the Person model
            const person = new Person({ ...args });

            try {
                // try to save the new person
                await person.save();
            } catch (error) {
                throw new GraphQLError("Saving person failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
            return person;
        },

        editNumber: async (root, args) => {
            // find and update person's phone
            const person = await Person.findOne({ name: args.name });
            person.phone = args.phone;

            // save updated person
            try {
                await person.save();
            } catch (error) {
                throw new GraphQLError("Saving number failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
            return person;
        },

        createUser: async (root, args) => {
            const user = new User({ username: args.username });

            return user.save().catch((error) => {
                throw new GraphQLError("Creating the user failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.username,
                        error,
                    },
                });
            });
        },

        login: async (root, args) => {
            // find the user in the mongodb
            const user = await User.findOne({
                username: args.username,
            });

            if (!user || args.password !== "secret") {
                throw new GraphQLError("Wrong credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            // if user exists, create user obj with the info that will be included in the jwt token
            const userForToken = {
                username: user.username,
                id: user._id,
            };

            const token = jwt.sign(userForToken, process.env.JWT_SECRET);

            // create a jwt token with the jwt sign
            return { value: token };
        },
    },
};

// start new Apollo server with the schema and resolvers as params
// the schema & resolvers define how GraphQL queries are respondend to
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },

    // context is used to do things that are shared by multiple resolvers (like user identification)
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;

        if (auth && auth.startsWith("Bearer ")) {
            const decodedToken = jwt.verify(
                auth.substring(7),
                process.env.JWT_SECRET
            );

            // find the current user by its id and populate friends array
            const currentUser = await User.findById(decodedToken.id).populate(
                "friends"
            );

            return { currentUser };
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
