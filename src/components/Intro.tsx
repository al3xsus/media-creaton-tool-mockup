import React from "react";
import LanguageSelector from "./LanguageSelector";

const Intro = ({lang, onLangChange}: { lang: string, onLangChange: (event: any) => void }) => {
    return <div className={"screen-container"}>
        <h1 className={"h1-custom"}>
            Hello!
        </h1>
        <p className={"p-custom"}>
            Welcome to Cool Media Creation Tool
        </p>
        <p className={"p-custom"}>
            If you prefer another language, please select here <LanguageSelector lang={lang}
                                                                                 onLangChange={onLangChange}/>
        </p>
    </div>
}

export default Intro