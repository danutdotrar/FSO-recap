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
const { expressMiddleware } = require("@apollo/server/express4");
const {
    ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const express = require("express");
const cors = require("cors");
const http = require("http");

const jwt = require("jsonwebtoken");
const User = require("./models/user");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");

// connect to mongodb
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
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

// start new Apollo server with the schema and resolvers as params
// the schema & resolvers define how GraphQL queries are respondend to
const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    // crate new websocket server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/",
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    // GraphQL server must be started before the Express app
    await server.start();

    app.use(
        "/",
        cors(),
        express.json(),

        expressMiddleware(server, {
            context: async ({ req }) => {
                const auth = req ? req.headers.authorization : null;

                if (auth && auth.startsWith("Bearer ")) {
                    const decodedToken = jwt.verify(
                        auth.substring(7),
                        process.env.JWT_SECRET
                    );

                    const currentUser = await User.findById(
                        decodedToken.id
                    ).populate("friends");
                    return { currentUser };
                }
            },
        })
    );

    const PORT = 4000;

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    );
};

start();
