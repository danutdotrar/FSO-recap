import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";

import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    gql,
} from "@apollo/client";

// TODO: continue part8d - Adding a token to a header

// create new client obj
const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
