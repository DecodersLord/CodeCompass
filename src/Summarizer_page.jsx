import React, { useState, useEffect } from "react";

function Summarizer_page({ summary }) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const typingSpeed = 20; // milliseconds per character

    useEffect(() => {
        // Reset when summary changes
        setDisplayedText("");
        setCurrentIndex(0);
    }, [summary]);

    useEffect(() => {
        if (currentIndex < summary.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + summary[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, typingSpeed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, summary]);

    // Parse the displayed text into bullet points
    const bulletPoints = displayedText
        .split("*")
        .map((point) => point.trim())
        .filter((point) => point.length > 0);

    return (
        <div className="p-4 border border-indigo-200 rounded-lg shadow-sm">
            <div className="font-semibold mb-2">Summary:</div>
            <div className="text-sm">
                {bulletPoints.length > 0 ? (
                    <ol className="space-y-2">
                        {bulletPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-indigo-500 mr-3 font-semibold min-w-[24px]">
                                    {index + 1}.
                                </span>
                                <span className="flex-1">
                                    {point}
                                    {index === bulletPoints.length - 1 &&
                                        currentIndex < summary.length && (
                                            <span className="inline-block w-1 h-4 bg-indigo-500 ml-1 animate-pulse" />
                                        )}
                                </span>
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
    );
}

export default Summarizer_page;
