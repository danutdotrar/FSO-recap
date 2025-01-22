const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const { ApolloServer } = require("@apollo/server");
// const { startStandaloneServer } = require("@apollo/server/standalone");

const { expressMiddleware } = require("@apollo/server/express4");
const {
    ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");

const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("./models/user");

const typeDefs = require("./schema/schema.js");
const resolvers = require("./resolvers/resolvers.js");

// test mongodb connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to MongoDB ", MONGODB_URI);
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB: ", error));

// refactor to listen to the root '/' of the server, using expressMiddleware
const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/",
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        // introspection: true,
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
                    ).populate("favoriteGenre");

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

// // start the server
// startStandaloneServer(server, {
//     listen: { port: 4000 },
//     context: async ({ req, res }) => {
//         // if there is any req, take headers.authorization
//         const auth = req ? req.headers.authorization : null;

//         // if auth not null and auth starts with 'Bearer '
//         if (auth && auth.startsWith("Bearer ")) {
//             // take the token
//             const token = auth.substring(7);

//             try {
//                 // decode with jwt.verify
//                 const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//                 // find the current user th
//                 const currentUser = await User.findById(decodedToken.id);

//                 return { currentUser };
//             } catch (error) {
//                 throw new GraphQLError("Invalid or expired token", {
//                     extensions: {
//                         code: "UNAUTHENTICATED",
//                     },
//                 });
//             }
//         }
//     },
// }).then(({ url }) => {
//     console.log(`Server ready at ${url}`);
// });
