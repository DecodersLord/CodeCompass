import { React, useState, useEffect } from "react";

function ResponseMessageContent({ response }) {
    console.log(response);
    return (
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
        </div>
    );
}

export default ResponseMessageContent;
