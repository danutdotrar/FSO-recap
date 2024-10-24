import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { gql } from "@apollo/client";

// define apollo client
const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});

// provide client to the app
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>
);
