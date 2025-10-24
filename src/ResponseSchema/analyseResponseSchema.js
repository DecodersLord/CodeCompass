const analyseResponseSchema = {
    type: "object",
    title: "AI analysis of user's code progress and reasoning quality",
    description:
        "Analyze the user's current coding progress on a problem and return structured, constructive feedback.",
    properties: {
        completion: {
            type: "integer",
            minimum: 0,
            maximum: 100,
            description:
                "Estimated percentage of problem-solving completion (0 = not started, 100 = fully solved).",
            example: 45,
        },
        stage: {
            type: "string",
            enum: [
                "not-started",
                "early-stage",
                "mid-progress",
                "near-solution",
                "optimization-phase",
            ],
            description:
                "High-level stage of problem-solving progress based on the completion percentage.",
            example: "mid-progress",
        },
        detectedApproach: {
            type: "string",
            description:
                "Detected algorithmic approach, data structure, or design pattern being used. If not clear, return 'unclear'.",
            example: "Two-pointer",
        },
        correctImplementations: {
            type: "array",
            maxItems: 3,
            description:
                "1–3 things the user has implemented correctly or efficiently.",
            items: {
                type: "string",
                example:
                    "Correctly identified need to compare adjacent elements in array.",
            },
            example: [
                "Implemented a correct base case for recursion.",
                "Used prefix sum to reduce repeated computation.",
                "Chose O(n) iteration instead of nested loops.",
            ],
        },
        mainIssue: {
            type: "string",
            description:
                "Biggest logical or conceptual issue preventing progress.",
        },
        confidence: {
            type: "number",
            minimum: 0,
            maximum: 1,
            description:
                "Model confidence score (0 = low, 1 = high) reflecting how certain it is about this analysis.",
            example: 0.82,
        },
    },
    required: [
        "completion",
        "stage",
        "detectedApproach",
        "correctImplementations",
        "mainIssue",
        "confidence",
    ],
    example: {
        completion: 60,
        stage: "mid-progress",
        detectedApproach: "Dynamic Programming with memoization",
        correctImplementations: [
            "Identified overlapping subproblems correctly.",
            "Memoization structure initialized properly.",
        ],
        mainIssue:
            "Logic resets correctly but fails to store the previous run before updating.",
        confidence: 0.9,
    },
};

export default analyseResponseSchema;
