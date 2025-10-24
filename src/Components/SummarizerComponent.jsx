import React from "react";

function SummarizerComponent({ summary }) {
    // Parse the displayed text into bullet points
    const bulletPoints = summary
        .split("*")
        .map((point) => point.trim())
        .filter((point) => point.length > 0);

    return (
        <div className="p-4 chat chat-start">
            <div className="chat-bubble">
                <div className="font-semibold mb-2">Summary:</div>
                <div className="text-sm">
                    {bulletPoints.length > 0 ? (
                        <ol className="space-y-2">
                            {bulletPoints.map((point, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-indigo-500 mr-3 font-semibold min-w-[24px]">
                                        {index + 1}.
                                    </span>
                                    <span className="flex-1">{point}</span>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        bulletPoints.map((point) => (
                            <span className="flex-1">{point}</span>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default SummarizerComponent;
