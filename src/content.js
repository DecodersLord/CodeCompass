window.isContentScriptReady = true;

const summarizerOptions = {
    sharedContext: "LeetCode problem",
    type: "key-points",
    format: "markdown",
    length: "medium",
    monitor(m) {
        m.addEventListener("downloadprogress", (e) => {
            console.log(`Summarizer downloaded ${e.loaded * 100}%`);
        });
    },
};

const promptOptions = {
    monitor(m) {
        m.addEventListener("downloadprogress", (e) => {
            console.log(`Language model downloaded ${e.loaded * 100}%`);
        });
    },
};

function getProblemText() {
    const metaDescriptionEl = document.querySelector("meta[name=description]");
    const problemStatement =
        metaDescriptionEl?.getAttribute("content") ||
        "No problem statement found.";

    return problemStatement;
}

window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "GET_SUMMARY") {
        (async () => {
            try {
                // Check if API is available
                if (!window.Summarizer) {
                    sendResponse({
                        summary:
                            "Summarizer API not available. Enable Chrome AI APIs in chrome://flags",
                    });
                    return;
                }

                // Check availability
                const availability = await window.Summarizer.availability();
                if (
                    availability.available === "no" ||
                    availability.available === "unknown"
                ) {
                    sendResponse({
                        summary: "Summarizer not available on this device",
                    });
                    return;
                }

                // Create summarizer
                const summarizer = await window.Summarizer.create(
                    summarizerOptions
                );

                // Get problem text and summarize
                const problemText = getProblemText();
                const summary = await summarizer.summarize(problemText);

                // Clean up
                summarizer.destroy();

                sendResponse({ summary });
            } catch (err) {
                console.error("Summarization failed:", err);
                sendResponse({
                    summary: "Error: " + err.message,
                });
            }
        })();

        return true; // Keep channel open for async response
    }

    if (request.action === "GET_PROMPT") {
        (async () => {
            try {
                // Check if API is available
                if (!window.LanguageModel) {
                    sendResponse({
                        result: "Prompt API not available. Enable Chrome AI APIs in chrome://flags",
                    });
                    return;
                }

                // Check availability
                const availability = await window.LanguageModel.availability();
                if (availability.available === "no") {
                    sendResponse({
                        result: "Language model not available on this device",
                    });
                    return;
                }

                // Create session
                const session = await window.LanguageModel.create({
                    promptOptions,
                    initialPrompts: [
                        {
                            role: "system",
                            content:
                                "You are a helpful assistant for LeetCode problem analysis. You are only allowed to provide hints and suggestions. You are not allowed to write any code.",
                        },
                    ],
                });

                // Get problem text
                const problemText = getProblemText();

                // Generate response
                const result = await session.prompt(
                    `Analyze this LeetCode problem and provide hints:\n\n${problemText}`
                );

                // Clean up
                session.destroy();

                sendResponse({ result });
            } catch (err) {
                console.error("Prompt generation failed:", err);
                sendResponse({
                    result: "Error: " + err.message,
                });
            }
        })();

        return true; // Keep channel open for async response
    }
});
