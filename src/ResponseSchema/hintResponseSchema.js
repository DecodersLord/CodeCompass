import analyseResponseSchema from "./analyseResponseSchema.js";

const schema = {
    type: "object",
    title: "Personalized Problem-Solving Hints Framework",
    description:
        "AI should provide context-aware hints and next steps based on user's current progress, mistakes, and reasoning gaps in the provided code.",

    properties: {
        problemUnderstanding: {
            type: "object",
            description:
                "Summarize what the problem is about and what part of it the user has understood correctly so far.",
            properties: {
                summary: {
                    type: "string",
                    description:
                        "Briefly restate the problem in simple terms for context.",
                },
                userUnderstanding: {
                    type: "string",
                    description:
                        "Summarize what the user's code suggests they understand about the problem.",
                },
                missedUnderstanding: {
                    type: "string",
                    description:
                        "Key conceptual misunderstanding or missing aspect detected in user’s approach.",
                },
            },
            required: ["summary", "userUnderstanding"],
        },

        userAnalysis: analyseResponseSchema,

        steps: {
            type: "array",
            description:
                "Adaptive guidance steps, dynamically tailored based on the user's current code and detected mistakes.",
            items: {
                type: "object",
                properties: {
                    step: {
                        type: "integer",
                        description: "Sequential step number (1–N)",
                    },
                    focusArea: {
                        type: "string",
                        description:
                            "Specific coding concept or reasoning aspect to improve (e.g., state transition, loop logic, edge case handling).",
                    },
                    personalizedHint: {
                        type: "string",
                        description:
                            "Tailored advice based directly on what the user did or missed in their current code.",
                    },
                    keyQuestions: {
                        type: "array",
                        maxItems: 3,
                        description:
                            "Reflective questions specifically targeted to the user’s current gap.",
                        items: { type: "string" },
                    },
                    fixSuggestion: {
                        type: "string",
                        description:
                            "A natural language suggestion (no code) on how to think about fixing or improving this issue.",
                    },
                    exampleThinking: {
                        type: "string",
                        description:
                            "An example thought process (not solution code) demonstrating how to apply the hint to this specific problem.",
                    },
                },
                required: ["step", "personalizedHint", "focusArea"],
            },
        },

        nextAction: {
            type: "string",
            description:
                "One clear action the user should take immediately (e.g., test a specific condition, visualize logic flow, refactor a loop).",
        },
    },

    required: ["problemUnderstanding", "userAnalysis", "steps"],

    example: {
        problemUnderstanding: {
            summary:
                "Find two adjacent increasing subarrays of equal length k.",
            userUnderstanding:
                "User correctly loops through the array to identify increasing sequences.",
            missedUnderstanding:
                "User hasn’t compared lengths of consecutive sequences yet.",
        },
        userAnalysis: {
            completion: 45,
            stage: "mid-progress",
            detectedApproach: "two-pointer / sliding window",
            mainIssue:
                "Logic resets correctly but fails to store the previous run before updating.",
        },
        steps: [
            {
                step: 1,
                focusArea: "state tracking",
                personalizedHint:
                    "You’re tracking the current increasing run correctly, but not saving the previous run before resetting.",
                keyQuestions: [
                    "When should you update the previous run variable?",
                    "What triggers resetting current run length?",
                ],
                fixSuggestion:
                    "Before resetting, compare current run length with previous one — this will let you detect adjacency.",
                exampleThinking:
                    "Think: If [1,2,3,1,2,3], after first reset, how can I still remember the first run’s length?",
            },
            {
                step: 2,
                focusArea: "adjacency validation",
                personalizedHint:
                    "You detect increasing patterns correctly but haven’t validated adjacency between them.",
                keyQuestions: [
                    "How can you know when two runs are consecutive?",
                    "What state info from the previous run helps confirm adjacency?",
                ],
                fixSuggestion:
                    "Track when a run ends and check if its end is exactly where the next begins.",
                exampleThinking:
                    "If previous run ends at index 3 and new one starts at 4, they’re adjacent.",
            },
        ],
        nextAction:
            "Add a check that compares the length of the last two runs before continuing iteration.",
    },
};

export default schema;
