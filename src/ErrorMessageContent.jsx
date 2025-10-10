import React from "react";

function ErrorMessageContent({ message }) {
    return (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="font-semibold text-red-700 mb-2">❌ Error</div>
            <div className="text-sm text-red-600">{message}</div>
        </div>
    );
}

export default ErrorMessageContent;
