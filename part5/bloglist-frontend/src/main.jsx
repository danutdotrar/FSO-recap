import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationWrapper } from "./context/notificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <NotificationWrapper>
        <App />
    </NotificationWrapper>
);
