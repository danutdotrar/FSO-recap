import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessage } from "../reducers/notificationReducer";

const Notification = () => {
    const dispatch = useDispatch();

    const notificationMessage = useSelector((state) => state.notification);

    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        marginBottom: 20,
    };

    if (notificationMessage !== "") {
        setTimeout(() => {
            dispatch(setMessage(""));
        }, 3000);
    }

    return (
        <>
            {notificationMessage && (
                <div style={style}>{notificationMessage}</div>
            )}
        </>
    );
};

export default Notification;
