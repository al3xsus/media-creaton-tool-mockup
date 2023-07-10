import React from "react";
import "./TitleBar.css"

const TitleBar = () => {
    return <div className="title-bar">
        <div className={"minimize"}/>
        <div className={"maximize"}/>
        <div className={"close"}>
            ❌
        </div>
    </div>
}

export default TitleBar