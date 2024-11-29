import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";

import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
    split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// define authLink
const authLink = setContext((_, { headers }) => {
    // take token from localstorage
    const token = localStorage.getItem("phonenumbers-user-token");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

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

// create new client obj
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
