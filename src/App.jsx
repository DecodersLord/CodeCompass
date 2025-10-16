import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import UserMessageContent from "./UserMessageContent.jsx";
import Summarizer_page from "./Summarizer_page.jsx";
import LoadingContent from "./LoadingContent.jsx";
import ResponseMessageContent from "./ResponseMessageContent.jsx";
import ErrorMessageContent from "./ErrorMessageContent.jsx";
import codeCompassLogo from "./assets/CodeCompass - Horizontal.png";

function App() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
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

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    async function handleSend() {
        const value = inputValue.trim();
        setInputValue("");

        setMessages((prev) => [
            ...prev,
            {
                type: "user",
                content: value,
            },
        ]);
        if (inputValue === "Summarize") {
            handleSummarize();
        } else {
            handlePrompt();
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
                { action: "GET_PROMPT" },
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

                    switch (type) {
                        case "user":
                            return <UserMessageContent message={content} />;

                        case "summary":
                            return (
                                <Summarizer_page
                                    key={index}
                                    summary={content}
                                />
                            );
                        case "hints":
                            return (
                                <ResponseMessageContent response={content} />
                            );
                        case "error":
                            return <ErrorMessageContent message={content} />;

                        case "loading":
                            return <LoadingContent message={content} />;

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

            <div className="flex flex-row justify-end items-end content-end m-5 p-6 gap-2">
                <input
                    type="text"
                    className="input"
                    placeholder="What do you need help with?"
                    list="suggestions"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    value={inputValue}
                />
                <datalist id="suggestions">
                    <option value=""></option>
                    <option value="Summarize"></option>
                    <option value="Generate Hints"></option>
                    <option value="Get Simillar problems"></option>
                </datalist>
                <button
                    className="btn btn-active btn-primary"
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <IoMdSend />
                    )}
                </button>
            </div>
        </div>
    );
}

export default App;
