import React from "react";

function LoadingContent({ message }) {
    return (
        <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
                <span className="loading loading-spinner loading-md"></span>
                <span className="text-gray-600">{message}</span>
            </div>
        </div>
    );
}

export default LoadingContent;
