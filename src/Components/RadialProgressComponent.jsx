import React from "react";

function RadialProgressComponent({ userAnalysis }) {
    return (
        <div className="card bg-neutral w-96 shadow-sm">
            <figure className="pt-6 pb-4 bg-base-100">
                <div
                    className="radial-progress bg-primary text-primary-content border-primary border-4"
                    style={
                        {
                            "--value": userAnalysis.completion,
                        } /* as React.CSSProperties */
                    }
                    aria-valuenow={userAnalysis.completion}
                    role="progressbar"
                >
                    {userAnalysis.completion}
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {userAnalysis.stage}
                    <div className="badge badge-secondary">
                        {userAnalysis.detectedApproach}
                    </div>
                </h2>
                <p>{userAnalysis.mainIssue}</p>
            </div>
        </div>
    );
}

export default RadialProgressComponent;
