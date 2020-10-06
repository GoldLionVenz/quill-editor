import React from "react";
import useComponentVisible from './use-component-visible'
import { ssml_breaks } from '../constants'

export default function DropDownBreak(props){
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <span ref={ref} className={`ql-ssml_break ql-picker ${isComponentVisible?"ql-expanded":""}`} style={{width: 45, padding: "4px 0px 0px"}} onClick={() => setIsComponentVisible(!isComponentVisible)}>
            <span className="ql-picker-label" tabIndex="0" role="button">
                <i className="pause icon" title="Break"></i>
                <svg viewBox="0 0 18 18">
                    <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
                    <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
                </svg>
            </span>
            <span  className="ql-picker-options" tabIndex="-1" id="ql-picker-options-0">
            {
                ssml_breaks.map((breakOption) => (
                    <button className="ql-insertBreak ql-picker-item" key={breakOption}  value={breakOption} onClick={()=>console.log('click heree')}>{breakOption}</button>
                ))
            }
            </span>
        </span>
    )
}