import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import UserMessageComponent from "./Components/UserMessageComponent.jsx";
import SummarizerComponent from "./Components/SummarizerComponent.jsx";
import LoadingComponent from "./Components/LoadingComponent.jsx";
import ResponseMessageComponent from "./Components/ResponseMessageComponent.jsx";
import ErrorMessageComponent from "./Components/ErrorMessageComponent.jsx";
import RadialProgressComponent from "./Components/RadialProgressComponent.jsx";
import codeCompassLogo from "./assets/CodeCompass - Horizontal.png";

function App() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [activeAction, setActiveAction] = useState(null);
    const [isLeetCode, setIsLeetCode] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const allowedOrigins = ["https://leetcode.com/problems/"];

    // Check if on LeetCode page
    useEffect(() => {
        async function checkPage() {
            try {
                // If Chrome API not available (localhost dev), skip check
                if (!window.chrome?.tabs?.query) {
                    setIsLeetCode(true); // Always allow in dev mode
                    setCurrentUrl("localhost (dev mode)");
                    return;
                }
                // eslint-disable-next-line no-undef
                const [tab] = await chrome.tabs.query({
                    active: true,
                    currentWindow: true,
                });

                if (tab?.url) {
                    setCurrentUrl(tab.url);
                    setIsLeetCode(
                        allowedOrigins.some((origin) =>
                            tab.url.startsWith(origin)
                        )
                    );
                }
            } catch (err) {
                console.error("Error checking page:", err);
            }
        }

        checkPage();

        // Re-check when tab changes
        const interval = setInterval(checkPage, 1000);
        return () => clearInterval(interval);
    }, []);

    async function handleSend(inputValue) {
        const value = inputValue.trim();
        setActiveAction(inputValue);

        setMessages((prev) => [
            ...prev,
            {
                type: "user",
                content: value,
            },
        ]);
        if (inputValue === "Summarize") {
            handleSummarize();
        } else if (inputValue === "Check Progress") {
            handleCheckProgress();
        } else {
            handlePrompt();
        }
    }

    async function handleCheckProgress() {
        setLoading(true);
        setMessages((prev) => [
            ...prev,
            { type: "loading", content: "Generating Response...." },
        ]);

        try {
            const [tab] = await window.chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            window.chrome.tabs.sendMessage(
                tab.id,
                { action: "GET_PROGRESS" },
                (response) => {
                    if (window.chrome.runtime.lastError) {
                        console.error(window.chrome.runtime.lastError.message);
                        setMessages((prev) => [
                            ...prev.slice(0, -1),
                            {
                                type: "error",
                                content:
                                    "Error: Please reload the page and try again",
                            },
                        ]);
                    } else {
                        setMessages((prev) => [
                            ...prev.slice(0, -1),
                            {
                                type: "progress",
                                content:
                                    response?.userAnalysis || "Not available.",
                            },
                        ]);
                    }
                    setLoading(false);
                }
            );
        } catch (err) {
            console.error("Error:", err);
            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    type: "error",
                    content: err.message,
                },
            ]);
            setLoading(false);
        }
    }

    async function handlePrompt() {
        setLoading(true);
        setMessages((prev) => [
            ...prev,
            { type: "loading", content: "Generating Response...." },
        ]);

        try {
            const [tab] = await window.chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            window.chrome.tabs.sendMessage(
                tab.id,
                { action: "GET_HINTS" },
                (response) => {
                    if (window.chrome.runtime.lastError) {
                        console.error(window.chrome.runtime.lastError.message);
                        setMessages((prev) => [
                            ...prev.slice(0, -1),
                            {
                                type: "error",
                                content:
                                    "Error: Please reload the page and try again",
                            },
                        ]);
                    } else {
                        setMessages((prev) => [
                            ...prev.slice(0, -1),
                            {
                                type: "hints",
                                content:
                                    response?.result || "No hints available.",
                            },
                        ]);
                    }
                    setLoading(false);
                }
            );
        } catch (err) {
            console.error("Error:", err);
            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    type: "error",
                    content: err.message,
                },
            ]);
            setLoading(false);
        }
    }

    async function handleSummarize() {
        setLoading(true);
        setMessages((prev) => [
            ...prev,
            { type: "loading", content: "Loading Summary...." },
        ]);

        try {
            const [tab] = await window.chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            window.chrome.tabs.sendMessage(
                tab.id,
                { action: "GET_SUMMARY" },
                (response) => {
                    if (window.chrome.runtime.lastError) {
                        console.error(window.chrome.runtime.lastError.message);
                        setMessages((prev) => [
                            ...prev.slice(0, -1),
                            {
                                type: "error",
                                content:
                                    "Error: Please reload the page and try again",
                            },
                        ]);
                    } else {
                        setMessages((prev) => [
                            ...prev.slice(0, -1),
                            {
                                type: "summary",
                                content:
                                    response?.summary || "No summary received",
                            },
                        ]);
                    }
                    setLoading(false);
                }
            );
        } catch (err) {
            console.error("Error:", err);
            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    type: "error",
                    content: err.message,
                },
            ]);
            setLoading(false);
        }
    }

    function renderMessages() {
        if (messages.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="text-4xl mb-4">💡</div>
                    <p className="text-lg font-medium text-gray-500">
                        Ready to help!
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Ask for a summary, hints, or similar problems
                    </p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {messages.map((message, index) => {
                    const { type, content } = message;
                    let parsedContent;

                    switch (type) {
                        case "user":
                            return <UserMessageComponent message={content} />;

                        case "summary":
                            return (
                                <SummarizerComponent
                                    key={index}
                                    summary={content}
                                />
                            );
                        case "hints":
                            parsedContent = JSON.parse(content);

                            return (
                                <ResponseMessageComponent
                                    response={parsedContent}
                                />
                            );
                        case "progress":
                            parsedContent = JSON.parse(content);
                            return (
                                <RadialProgressComponent
                                    method="analysis"
                                    userAnalysis={parsedContent}
                                />
                            );
                        case "error":
                            return <ErrorMessageComponent message={content} />;

                        case "loading":
                            return <LoadingComponent message={content} />;

                        default:
                            return (
                                <div key={index} className="text-gray-500">
                                    {content}
                                </div>
                            );
                    }
                })}
            </div>
        );
    }

    if (!isLeetCode) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center p-6">
                <img src={codeCompassLogo} />
                <div className="text-center max-w-md">
                    <p className="text-gray-600 mb-4">
                        Navigate to a LeetCode problem to get started!
                    </p>
                    <a
                        href="https://leetcode.com/problemset/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded transition-colors"
                    >
                        Go to LeetCode
                    </a>
                </div>
                {currentUrl && (
                    <p className="mt-6 text-xs text-gray-400">
                        Current: {currentUrl}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="bg-base-300 rounded-lg flex flex-col items-center justify-center content-center">
                <img src={codeCompassLogo} className="rounded-lg w-full" />
            </div>

            <div className="flex-1 overflow-y-auto p-4">{renderMessages()}</div>

            <div className="flex flex-row justify-center items-center m-5 p-4 gap-4">
                <button
                    className="btn btn-secondary"
                    onClick={() => handleSend("Summarize")}
                    disabled={loading}
                >
                    {loading && activeAction === "Summarize" ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        "Summarize Problem"
                    )}
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => handleSend("hint")}
                    disabled={loading}
                >
                    {loading && activeAction === "hint" ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        "Get Hints"
                    )}
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => handleSend("Check Progress")}
                    disabled={loading}
                >
                    {loading && activeAction === "Check Progress" ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        "Check Progress"
                    )}
                </button>
            </div>
        </div>
    );
}

export default App;
