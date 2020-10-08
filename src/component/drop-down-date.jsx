import React from "react";
import useComponentVisible from './use-component-visible'
import { ssml_dates } from '../constants'

export default function DropDownBreak(props){
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <span data-testid="select" ref={ref} className={`ql-ssml_date ql-picker ${isComponentVisible?"ql-expanded":""}`} style={{width: 45, padding: "4px 0px 0px"}} onClick={() => setIsComponentVisible(!isComponentVisible)}>
            <span className="ql-picker-label" tabIndex="0" role="button" style={{display:"flex", alignItems:"center"}}>
                <i className="calendar alternate outline icon" title="Date"></i>
                <svg viewBox="0 0 18 18">
                    <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
                    <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
                </svg>
            </span>
            <span className="ql-picker-options" tabIndex="-1" id="ql-picker-options-3">
            {
                ssml_dates.map((date) => ( 
                    <button className="ql-insertDate ql-picker-item" key={date}  value={date}>{date}</button>
                ))
            }
            </span>
        </span>
    )
}