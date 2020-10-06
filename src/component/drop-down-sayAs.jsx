import React from "react";
import useComponentVisible from './use-component-visible'
import { ssml_sayAs } from '../constants'

export default function DropDownBreak(props){
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <span ref={ref} className={`ql-ssml_sayas ql-picker ${isComponentVisible?"ql-expanded":""}`} style={{width: 45, padding: "4px 0px 0px"}} onClick={() => setIsComponentVisible(!isComponentVisible)}>
          <span className="ql-picker-label" tabIndex="0" role="button">
            <i className="keyboard outline icon" title="Say-as"></i>
            <svg viewBox="0 0 18 18">
                <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
                <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
            </svg>
          </span>
          <span className="ql-picker-options "  tabIndex="-1" id="ql-picker-options-2">
            {
              ssml_sayAs.map((say) => ( 
                <button className="ql-insertSayAs ql-picker-item" key={say}  value={say}>{say}</button>
              ))
            }
          </span>
        </span>
    )
}