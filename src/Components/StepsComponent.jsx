import React from "react";

function StepsComponent({ steps }) {
    return (
        <div className="space-y-2 ">
            {steps.map((step, stepIndex) => (
                <div
                    key={stepIndex}
                    className="collapse collapse-arrow bg-neutral border border-base-300"
                >
                    <input
                        type="radio"
                        name="my-accordion-2"
                        defaultChecked={stepIndex === 0}
                    />
                    <div className="collapse-title font-semibold">
                        {step.step} - {step.focusArea}
                    </div>
                    <div className="collapse-content text-sm">
                        {step.personalizedHint}
                        <ul className="list-none mt-2 pl-2">
                            {step.keyQuestions.map((question, index) => (
                                <li
                                    key={index}
                                    className="flex items-start mb-1"
                                >
                                    <span className="text-indigo-500 mr-2 text-sm min-w-[20px]">
                                        {index + 1}.
                                    </span>
                                    <span className="flex-1">{question}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StepsComponent;
