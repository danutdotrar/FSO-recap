import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";

import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

// create new client obj
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
