import React from "react";
import {TargetProps} from "../types";
import {ReactComponent as ISOIcon} from "../assets/iso-file-icon.svg";
import {ReactComponent as OSIcon} from "../assets/operating-system-icon.svg";
import {Header} from "semantic-ui-react";

const TargetScreen = ({chosenTarget, onTargetChange}: TargetProps) => {
    return <div className={"screen-container"}>
        <Header size='huge'>Please, choose the target:</Header>
        <div className={"content-section"}>
            <div
                className={chosenTarget === "media" ? "choose-option neumorph-pressed" : "choose-option neumorph-default"}
                id={"media"}
                onClick={() => onTargetChange("media")}
            >
                <OSIcon style={{width: "50%", height: "50%"}} fill={chosenTarget === "media" ? "#438945" : "#1D1D2C"}/>
                <Header as='h2'>
                    Bootable device
                    <Header.Subheader>
                        Choose if you want to create bootable media device.
                    </Header.Subheader>
                </Header>
            </div>
            <div
                className={chosenTarget === "ISO" ? "choose-option neumorph-pressed" : "choose-option neumorph-default"}
                id={"ISO"}
                onClick={() => onTargetChange("ISO")}
            >
                <ISOIcon style={{width: "50%", height: "50%"}} fill={chosenTarget === "ISO" ? "#438945" : "#1D1D2C"}/>
                <Header as='h2'>
                    ISO file
                    <Header.Subheader>
                        Choose if you want just to save data and create bootable media device later.
                    </Header.Subheader>
                </Header>
            </div>
        </div>
    </div>
}

export default TargetScreen