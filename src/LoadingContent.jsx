import React from "react";

function LoadingContent({ message }) {
    return (
        <div className="p-4 chat-response">
            <div className="chat-bubble">
                <div className="flex items-center gap-3">
                    <span className="loading loading-dots loading-md"></span>
                    <span className="text-gray-600">{message}</span>
                </div>
            </div>
        </div>
    );
}

export default LoadingContent;
