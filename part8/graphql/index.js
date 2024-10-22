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

// define persons array
let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431",
    },
    {
        name: "Matti Luukkainen",
        phone: "040-432342",
        street: "Malminkaari 10 A",
        city: "Helsinki",
        id: "3d599470-3436-11e9-bc57-8b80ba54c431",
    },
    {
        name: "Venla Ruuska",
        street: "Nallemäentie 22 C",
        city: "Helsinki",
        id: "3d599471-3436-11e9-bc57-8b80ba54c431",
    },
];

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
    }

    enum YesNo {
        YES
        NO
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person]!
        findPerson(name: String!): Person
    }
`;

// define the resolvers
// the resolvers correspond to the queries described in the schema
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: (root, args) => {
            if (!args.phone) {
                return persons;
            }

            const byPhone = (person) =>
                args.phone === "YES" ? person.phone : !person.phone;

            return persons.filter(byPhone);
        },
        findPerson: (root, args) =>
            persons.find((person) => person.name === args.name),
    },

    Person: {
        address: (root) => {
            return { city: root.city, street: root.street };
        },
    },

    Mutation: {
        addPerson: (root, args) => {
            // error handling for unique names
            if (persons.find((person) => person.name === args.name)) {
                throw new GraphQLError("Name must be unique", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                    },
                });
            }

            // add the id to the person
            const person = { ...args, id: uuid() };
            persons = persons.concat(person);
            return person;
        },

        editNumber: (root, args) => {
            // find the person in the db
            const person = persons.find((person) => person.name === args.name);

            if (!person) {
                return null;
            }

            const updatedPerson = { ...person, phone: args.phone };

            persons = persons.map((p) =>
                p.name === updatedPerson.name ? updatedPerson : p
            );

            return updatedPerson;
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
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
