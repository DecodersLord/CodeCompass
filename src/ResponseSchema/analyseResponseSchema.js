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
        level: {
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
        approach: {
            type: "string",
            description:
                "Detected algorithmic approach, data structure, or design pattern being used. If not clear, return 'unclear'.",
            example:
                "Two-pointer sliding window with hashmap for frequency tracking",
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
        missingPieces: {
            type: "array",
            maxItems: 3,
            description:
                "1–3 missing or incorrect logical, structural, or efficiency-related aspects.",
            items: {
                type: "string",
                example:
                    "Forgot to reset current subarray length when the increasing sequence breaks.",
            },
            example: [
                "Did not handle edge cases for single-element arrays.",
                "Used incorrect variable for comparison inside loop.",
            ],
        },
        codeSmells: {
            type: "array",
            maxItems: 3,
            description:
                "Optional list of suboptimal coding patterns or readability issues (naming, nesting, redundancy).",
            items: {
                type: "string",
                example:
                    "Nested conditional blocks can be simplified with early return.",
            },
            example: [
                "Variable names are too generic (e.g., 'temp', 'data').",
                "Loop nesting depth > 3, making code harder to follow.",
            ],
        },
        recommendedNextStep: {
            type: "string",
            description:
                "Specific, actionable suggestion to move the user closer to the solution.",
            example:
                "Try using a sliding window instead of recomputing sums for each subarray.",
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
        "level",
        "approach",
        "correctImplementations",
        "missingPieces",
    ],
    example: {
        completion: 60,
        level: "mid-progress",
        approach: "Dynamic Programming with memoization",
        correctImplementations: [
            "Identified overlapping subproblems correctly.",
            "Memoization structure initialized properly.",
        ],
        missingPieces: [
            "Base case not correctly returning 0 for empty input.",
            "Did not handle negative indices in recursive calls.",
        ],
        codeSmells: [
            "Function names are non-descriptive (e.g., 'calc' instead of 'maxProfit').",
        ],
        recommendedNextStep:
            "Add base case guards and print recursive calls to debug edge handling.",
        confidence: 0.9,
    },
};

export default analyseResponseSchema;
