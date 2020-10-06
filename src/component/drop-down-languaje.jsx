import React from "react";
import useComponentVisible from './use-component-visible'
import { ssml_languages } from '../constants'

export default function DropDownBreak(props){
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <span ref={ref} className={`ql-ssml_language ql-picker ${isComponentVisible?"ql-expanded":""}`} style={{width: 45, padding: "4 0 0"}} onClick={() => setIsComponentVisible(!isComponentVisible)}>
            <span className="ql-picker-label" tabIndex="0" role="button" style={{display:"flex", alignItems:"center"}}>
                <i className="language icon" title="Language"></i>
                <svg viewBox="0 0 18 18">
                    <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
                    <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
                </svg>
            </span>
            <span className="ql-picker-options" tabIndex="-1" id="ql-picker-options-1">
            {
                ssml_languages.map((language) => (
                    <button className="ql-insertLanguage ql-picker-item" key={language}  value={language}>{language}</button>
                ))
            }
            </span>
        </span>
    )
}