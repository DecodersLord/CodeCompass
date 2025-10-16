import React from "react";

function UserMessageContent({ message }) {
    return (
        <div className="chat chat-end">
            <div className="chat-bubble text-base">{message}</div>
        </div>
    );
}

export default UserMessageContent;
