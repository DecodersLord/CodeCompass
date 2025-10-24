import React from "react";
import RadialProgressComponent from "./RadialProgressComponent.jsx";
import StepsComponent from "./StepsComponent.jsx";

function ResponseMessageComponent({ response }) {
    console.log(response);
    return (
        <>
            <div className="chat chat-start text-base py-2">
                <RadialProgressComponent userAnalysis={response.userAnalysis} />
                <div className="divider"></div>
                <StepsComponent steps={response.steps} />
                <div className="divider"></div>
            </div>
        </>
    );
}

export default ResponseMessageComponent;
{
    /* 
        <div className="p-4 chat chat-start text-base">
            <div className="chat-bubble">
                {response.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="mb-4">
                        <div className="divider"></div>
                        <span>
                            {step.step} - {step.name}
                        </span>
                        <div className="divider"></div>

                        <ul className="list-none pl-2">
                            {step.keyQuestions.map((question, index) => (
                                <li
                                    key={index}
                                    className="flex items-start mb-1"
                                >
                                    <span className="text-indigo-500 mr-2 font-semibold min-w-[20px]">
                                        {index + 1}.
                                    </span>
                                    <span className="flex-1">{question}</span>
                                </li>
                            ))}
                        </ul>

                        <div>
                            <span>{step.example}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div> */
}
