import React from "react";
import {Stages} from "../types";
import { Step } from 'semantic-ui-react'

const ProgressBar = ({stage}: { stage: Stages }) => {
    const stagesKeys = Object.keys(Stages).filter((v) => isNaN(Number(v)));
    // return <div className="stepper-wrapper">
    //     {
    //         stagesKeys.map((stageName, index) => {
    //             return <div
    //                 className={stage === index ? "stepper-item active" : stage > index ? "stepper-item completed" : "stepper-item"}
    //                 key={index}>
    //                 <div className="step-counter">{index}</div>
    //                 <div className="step-name">{stageName}</div>
    //             </div>
    //         })
    //     }
    // </div>
    return <Step.Group widths={6} ordered size={"tiny"} fluid>
        {
            stagesKeys.map((stageName, index) => {
                return <Step
                    active={stage === index}
                    completed={stage > index}
                    disabled={stage < index}
                    key={index}
                >
                    <Step.Content>
                        <Step.Title>{stageName}</Step.Title>
                        <Step.Description>{stageName}</Step.Description>
                    </Step.Content>
                </Step>
            })
        }
    </Step.Group>
}

export default ProgressBar