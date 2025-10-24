import schema from "./ResponseSchema/hintResponseSchema.js";
import analyseResponseSchema from "./ResponseSchema/analyseResponseSchema.js";
window.isContentScriptReady = true;

const userAttempts = {
    userHintsAsked: 0,
    hasUserSolvedSimillarProblem: false,
    hasUserImplementedPreviousHint: false,
    timeSpent: 0.0,
};

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

function respond(sendResponse, key, value) {
    try {
        sendResponse({ [key]: value });
    } catch (err) {
        console.log("Failed to send response: ", err);
    }
}

function logError(context, err) {
    console.log(`${context}`, err.name, err.message);
}

async function ensureAPIAvailability(API, name) {
    if (!API) {
        throw new Error(
            `${name} API not available. Enable Chrome AI APIs in chrome://flags`
        );
    }
    const availability = await API.availability();
    if (
        availability.available === "no" ||
        availability.available === "unknown"
    ) {
        throw new Error(`${name} not available on this device`);
    }
}

function getProblemText() {
    const metaDescriptionEl = document.querySelector("meta[name=description]");
    const problemStatement =
        metaDescriptionEl?.getAttribute("content") ||
        "No problem statement found.";

    return problemStatement;
}

function getUserCode() {
    const userCurrentCodeContainer = document.querySelectorAll(".view-line");

    const code = Array.from(userCurrentCodeContainer)
        .map((line) => line.textContent || "") // Ensure textContent is not null
        .join("\n");

    return code;
}

async function summarize_problem(problemText) {
    await ensureAPIAvailability(window.Summarizer, "Summarizer");

    const summarizer = await window.Summarizer.create(summarizerOptions);
    const summary = await summarizer.summarize(problemText);

    summarizer.destroy();

    return summary;
}

async function checkProgress(problemText, userCode, session) {
    const currentUserStatus = await session.prompt(
        `From the provided leetcode problem:\n\n ${problemText}\n
                    and user's code: ${userCode}
                    Analyse the current status of user's code towards solution.

                    Expected output must match the JSON schema.`,
        {
            responseConstraint: analyseResponseSchema,
        }
    );

    return currentUserStatus;
}

async function getHints(problemText, currentUserStatus, session) {
    const result = await session.prompt(
        `Based on this user analysis: ${JSON.stringify(
            currentUserStatus
        )}, and problem statement: ${problemText}
         provide a series of adaptive hints and next steps. 
         Output should follow this hint framework schema: 
         problemUnderstanding + userAnalysis + steps + nextAction.`,
        {
            responseConstraint: schema,
        }
    );

    return result;
}

window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Get problem text
    const problemText = getProblemText();

    const userCode = getUserCode();

    (async () => {
        try {
            if (request.action === "GET_SUMMARY") {
                const summary = await summarize_problem(
                    problemText,
                    sendResponse
                );
                respond(sendResponse, "summary", summary);
            } else if (
                request.action === "GET_HINTS" ||
                request.action === "GET_PROGRESS"
            ) {
                await ensureAPIAvailability(
                    window.LanguageModel,
                    "LanguageModel"
                );
                const session = await window.LanguageModel.create({
                    promptOptions,
                    initialPrompts: [
                        {
                            role: "system",
                            content:
                                "You are a helpful assistant for LeetCode problem analysis. You are only allowed to provide hints and suggestions. You are not allowed to write any code.",
                        },
                        {
                            role: "user",
                            content: "I need you to provide the code.",
                        },
                        {
                            role: "assistant",
                            content:
                                "Apologies but I think you should tackle this like a real life interview I can provide you some hints without any code to help you think in better direction.",
                        },
                    ],
                });

                try {
                    const currentUserStatus = await checkProgress(
                        problemText,
                        userCode,
                        session
                    );

                    if (request.action === "GET_HINTS") {
                        const result = await getHints(
                            problemText,
                            currentUserStatus,
                            session
                        );

                        respond(sendResponse, "result", result);
                    } else {
                        respond(
                            sendResponse,
                            "userAnalysis",
                            currentUserStatus
                        );
                    }
                } finally {
                    session.destroy();
                }
                return;
            }

            respond(
                sendResponse,
                "error",
                "Unknown request action: " + request.action
            );
        } catch (err) {
            logError("Message handler", err);
            respond(sendResponse, "result", "Error: " + err.message);
        }
    })();

    return true; // Keep channel open for async response
});
