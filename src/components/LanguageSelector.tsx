import React from "react";
import "./LanguageSelector.css"

const LanguageSelector = ({lang, onLangChange}: { lang: string, onLangChange: (event: any) => void }) => {
    return <select value={lang} onChange={onLangChange}>
        <option value={"FR"}>🇫🇷 Français</option>
        <option value={"DE"}>🇩🇪 Deutsch</option>
        <option value={"ES"}>🇪🇸 Español</option>
        <option value={"EN"}>🇬🇧 English</option>
    </select>
}

export default LanguageSelector