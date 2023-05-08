const Notification = ({ message }) => {
    if (message === null) return null;
    else if (message.includes("Information")) {
        return <div className="e-msg">{message}</div>;
    }

    return <div className="s-msg">{message}</div>;
};

export default Notification;