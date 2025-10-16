const schema = {
    type: "object",
    title: "Problem Solving Hint Framework",
    properties: {
        steps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    step: {
                        type: "integer",
                        description: "Sequential step number (1 to 4)",
                    },
                    name: {
                        type: "string",
                        description: "Name or theme of the hint step",
                    },
                    goal: {
                        type: "string",
                        description: "Purpose or reasoning focus of this step",
                    },
                    keyQuestions: {
                        type: "array",
                        maxItems: 3,
                        description:
                            "Guiding questions to think through before moving to next step",
                        items: {
                            type: "string",
                        },
                    },
                    example: {
                        type: "string",
                        description:
                            "Illustrative example of applying this step to a sample problem",
                    },
                },
                required: ["step", "name", "goal", "keyQuestions"],
            },
        },
    },
    required: ["steps"],
    example: {
        steps: [
            {
                step: 1,
                name: "Restate the Problem Clearly",
                goal: "Understand the true structure and dependencies before coding.",
                keyQuestions: [
                    "What is the problem actually asking for?",
                    "Which parts depend on each other, and which are independent?",
                    "Where do transitions or resets occur?",
                ],
                example:
                    "In 'Adjacent Increasing Subarrays', restate as: We want two separate, consecutive increasing runs of length k.",
            },
            {
                step: 2,
                name: "Identify the State or Key Variable",
                goal: "Define what information from the past must be remembered to make decisions now.",
                keyQuestions: [
                    "What do I carry over between iterations?",
                    "What is my state representation (e.g., dp[i], prevRun)?",
                    "What happens when a condition breaks or resets?",
                ],
                example:
                    "Track current increasing run length and previous run length before reset.",
            },
            {
                step: 3,
                name: "Model the Transition",
                goal: "Define how the state changes on each iteration.",
                keyQuestions: [
                    "When do I update the state?",
                    "When do I reset the state?",
                    "What triggers movement to the next subproblem?",
                ],
                example:
                    "If nums[i] > nums[i-1], extend current run; else, store previous and reset count.",
            },
            {
                step: 4,
                name: "Validate with Edge Cases",
                goal: "Test logic on tricky boundaries to ensure robustness.",
                keyQuestions: [
                    "What happens on small or edge inputs?",
                    "Does my logic handle resets and adjacency properly?",
                    "Can my state ever miss valid configurations?",
                ],
                example:
                    "Try nums = [2,5,7,8,9,2,3,4], k = 3 — verify runs reset correctly and adjacency is detected.",
            },
        ],
    },
};

export default schema;
