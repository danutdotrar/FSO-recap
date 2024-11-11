import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

// define apollo client
// use link
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>
);
