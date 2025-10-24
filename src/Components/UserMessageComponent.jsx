import React from "react";

function UserMessageComponent({ message }) {
    return (
        <div className="chat chat-end">
            <div className="chat-bubble text-base">{message}</div>
        </div>
    );
}

export default UserMessageComponent;
