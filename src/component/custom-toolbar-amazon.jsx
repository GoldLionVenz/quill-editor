import React from "react";
import { IoIosVolumeLow } from "react-icons/io";
import { BiParagraph, BiPencil, BiFont, BiCodeAlt } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import DropDownBreak from './drop-down-break'
import DropDownLanguaje from './drop-down-languaje'
import DropDownSayAs from './drop-down-sayAs'
import DropDownDate from './drop-down-date'
import DropDownEmphasis from "./drop-down-emphasis"
import DropDownWords from "./drop-down-words"
import PropTypes from "prop-types";
export default function CustomToolbarAmazon(props){

    return (
      <div id="toolbar">
        <select value={props.platform} onChange={()=>{}} className="ql-selectPlatform ql-header">
          <option value="amazon">Amazon</option>
          <option value="google">Google</option>
        </select>
        <button className="ql-insertSpeak" title="Speak"><FaRegComment /></button>
        <DropDownBreak />
        <DropDownEmphasis/>
        <button className="ql-insertWhisperingAmazon" title="Whispering"><IoIosVolumeLow size={30} /></button>
        <DropDownLanguaje />
        <button className="ql-insertParagraph" title="Paragraph"><BiParagraph /></button>
        <DropDownSayAs />
        <DropDownDate />
        <button className="ql-insertSubstitute" title="Substitute"><BiPencil /></button>
        <button className="ql-insertPhoneme" title="Phoneme"><BiFont /></button>
        <button className="ql-insertSentence" title="Sentence"><i className="exclamation icon"></i></button>
        <DropDownWords/>
        <button className="ql-parse" title="Parse"><BiCodeAlt /></button>
      </div>
    );
};

CustomToolbarAmazon.propTypes={
  platform:PropTypes.oneOf(['amazon', 'google']).isRequired
}