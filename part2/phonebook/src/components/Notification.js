const Notification = ({ message }) => {
    if (message === null) return null;
    else if (message.includes("failed") || message.includes("removed")) {
        return <div className="e-msg">{message}</div>;
    }

    return <div className="s-msg">{message}</div>;
};

export default Notification;