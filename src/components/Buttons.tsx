import React from "react";
import {BtnConfig} from "../types";

const Buttons = ({btnConfig}: { btnConfig: BtnConfig }) => {
    return <div style={{
        height: "5%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "1vh 1vw"
    }}>
        {btnConfig.backBtn}
        {btnConfig.forwardBtn}
    </div>
}

export default Buttons