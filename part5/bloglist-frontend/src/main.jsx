import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationWrapper } from "./context/notificationContext";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <NotificationWrapper>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </NotificationWrapper>
);
