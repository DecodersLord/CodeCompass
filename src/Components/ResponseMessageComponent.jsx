import React from "react";
import RadialProgressComponent from "./RadialProgressComponent.jsx";
import StepsComponent from "./StepsComponent.jsx";

function ResponseMessageComponent({ response }) {
    return (
        <>
            <div className="chat chat-start text-base py-2">
                <RadialProgressComponent
                    method="hints"
                    userAnalysis={response.userAnalysis}
                />
                <div className="divider"></div>
                <StepsComponent steps={response.steps} />
                <div className="divider"></div>
            </div>
        </>
    );
}

export default ResponseMessageComponent;
