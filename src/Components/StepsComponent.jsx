import React from "react";

function StepsComponent({ steps }) {
    console.log(steps);
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StepsComponent;
