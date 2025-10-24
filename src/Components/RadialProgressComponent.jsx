import React from "react";

function RadialProgressComponent({ method, userAnalysis }) {
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
                    {userAnalysis.completion}%
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {userAnalysis.stage}
                    <div className="badge badge-secondary">
                        {userAnalysis.detectedApproach}
                    </div>
                </h2>
                {method === "analysis" ? (
                    <div className="mt-4">
                        {userAnalysis.correctImplementations &&
                        userAnalysis.correctImplementations.length > 0 ? (
                            <ol className="space-y-2">
                                {userAnalysis.correctImplementations.map(
                                    (point, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <span className="mr-3 font-semibold min-w-[24px]">
                                                {index + 1}.
                                            </span>
                                            <span className="flex-1">
                                                {point}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ol>
                        ) : (
                            <p>No correct implementations detected yet.</p>
                        )}
                    </div>
                ) : (
                    userAnalysis.mainIssue && (
                        <p className="mt-2">{userAnalysis.mainIssue}</p>
                    )
                )}
            </div>
        </div>
    );
}

export default RadialProgressComponent;
