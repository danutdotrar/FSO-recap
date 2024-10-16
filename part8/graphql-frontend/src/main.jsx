import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";

import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    gql,
} from "@apollo/client";

// create new client obj
const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
});

// define the graphql query
// const query = gql`
//     query {
//         allPersons {
//             name
//             phone
//             address {
//                 street
//                 city
//             }
//             id
//         }
//     }
// `;

// the app can communicate with a GraphQL server using the `client` object
// send query to the server
// client.query({ query }).then((response) => {
//     console.log(response.data);
// });

ReactDOM.createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
