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
    type Person {
        name: String!
        phone: String
        street: String!
        city: String!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
`;

// define the resolvers
// the resolvers correspond to the queries described in the schema
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) =>
            persons.find((person) => person.name === args.name),
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
