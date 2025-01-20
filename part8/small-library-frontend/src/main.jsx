import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    split,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// define authLink
const authLink = setContext((_, { headers }) => {
    // get the token from localStorage
    const token = localStorage.getItem("library-user-token");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

// createHttpLink
const httpLink = createHttpLink({
    uri: "http://localhost:4000",
});

const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);

        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

// define apollo client
// use link
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>
);
