import React from "react";
import {ArchitectureProps} from "../types";
import {Header} from "semantic-ui-react";

const ArchitectureScreen = ({architecture, onArchitectreChange}: ArchitectureProps) => {
    return <div className={"screen-container"}>
        <Header size='huge'>Please, select architecture:</Header>
        <div className={"content-section"}>
            <div
                className={architecture === "x32" ? "choose-option neumorph-pressed" : "neumorph-default choose-option"}
                onClick={() => onArchitectreChange("x32")}
            >
                <Header size='large' style={{color: architecture === "x32" ? "#438945" : "#1D1D2C"}}>x32</Header>
            </div>
            <div
                className={architecture === "x64" ? "choose-option neumorph-pressed" : "neumorph-default choose-option"}
                onClick={() => onArchitectreChange("x64")}
            >
                <Header size='large' style={{color: architecture === "x64" ? "#438945" : "#1D1D2C"}}>x64</Header>
            </div>
            <div
                className={architecture === "ARM" ? "choose-option neumorph-pressed" : "neumorph-default choose-option"}
                onClick={() => onArchitectreChange("ARM")}
            >
                <Header size='large' style={{color: architecture === "ARM" ? "#438945" : "#1D1D2C"}}>ARM</Header>
            </div>
        </div>
    </div>
}

export default ArchitectureScreen