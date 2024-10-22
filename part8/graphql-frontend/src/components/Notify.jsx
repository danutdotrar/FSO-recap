export const Notify = ({ error }) => {
    if (!error) {
        return null;
    }

    return <div style={{ color: "red" }}>{error}</div>;
};
