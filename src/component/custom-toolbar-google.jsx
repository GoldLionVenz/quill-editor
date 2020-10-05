import React, { useState } from "react";
import { IoIosVolumeHigh, IoIosVolumeLow } from "react-icons/io";
import { BiParagraph, BiPencil, BiCodeAlt } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { ssml_breaks, ssml_dates, ssml_sayAs } from '../constants'

export default function CustomToolbarGoogle(props){
    const [openBreak, setOpenBreak]=useState(false)
    const [openSayAs, setOpenSayAs]=useState(false)
    const [openDate, setOpenDate]=useState(false)

    return (
      <div id="toolbar">
        <select value={props.plataform} onChange={()=>{}} className="ql-selectPlatform ql-header">
          <option value="amazon">Amazon</option>
          <option value="google">Google</option>
        </select>
        <button className="ql-insertSpeak"><FaRegComment /></button>
        <span className={`ql-ssml_break ql-picker ${openBreak?"ql-expanded":""}`} style={{width: 45, padding: "4px 0px 0px"}} onClick={() => setOpenBreak(!openBreak)}>
            <span className="ql-picker-label" tabIndex="0" role="button">
                <i className="pause icon" title="Break"></i>
                <svg viewBox="0 0 18 18">
                    <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
                    <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
                </svg>
            </span>
            <span className="ql-picker-options" tabIndex="-1" id="ql-picker-options-0">
            {
                ssml_breaks.map((breakOption) => (
                    <button className="ql-insertBreak ql-picker-item" key={breakOption}  value={breakOption}>{breakOption}</button>
                ))
            }
            </span>
        </span>
        <button className="ql-insertEmphasis"><IoIosVolumeHigh size={30}/></button>
        <button className="ql-insertWhisperingGoogle"><IoIosVolumeLow size={30}/></button>
        {/*<select className="ql-insertLanguage ql-header">
          {ssml_languages.map((language) => (
            <option key={language} value={language} className="ql-ssml_date">
              {language}
            </option>
          ))}
        </select>*/}
        <button className="ql-insertParagraph"><BiParagraph title="Paragraph"/></button>
        <span className={`ql-ssml_sayas ql-picker ${openSayAs?"ql-expanded":""}`} style={{width: 45, padding: "4px 0px 0px"}} onClick={() => setOpenSayAs(!openSayAs)}>
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
        <span className={`ql-ssml_date ql-picker ${openDate?"ql-expanded":""}`} style={{width: 45, padding: "4px 0px 0px"}} onClick={() => setOpenDate(!openDate)}>
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
        <button className="ql-insertSubstitute">
          <BiPencil title="Substitute"/>
        </button>
        {/*<button className="ql-insertPhoneme" >
          <BiFont title="Phoneme"/>
        </button>*/}
        <button className="ql-parse">
          <BiCodeAlt title="Parse"/>
        </button>
        
      </div>
    );
  };