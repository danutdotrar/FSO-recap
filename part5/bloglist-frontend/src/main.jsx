import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationWrapper } from "./context/notificationContext";
import { UserProviderWrapper } from "./context/userContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <NotificationWrapper>
            <UserProviderWrapper>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </UserProviderWrapper>
        </NotificationWrapper>
    </Router>
);
