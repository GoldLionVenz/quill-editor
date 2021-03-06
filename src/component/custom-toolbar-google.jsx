import React from "react";
import { IoIosVolumeLow } from "react-icons/io";
import { BiParagraph, BiPencil, BiCodeAlt } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import DropDownBreak from "./drop-down-break";
import DropDownSayAs from "./drop-down-sayAs";
import DropDownDate from "./drop-down-date";
import DropDownEmphasis from "./drop-down-emphasis";
import PropTypes from "prop-types";
export default function CustomToolbarGoogle(props) {
  return (
    <div id="toolbar">
      <select
        value={props.plataform}
        onChange={() => {}}
        className="ql-selectPlatform ql-header"
      >
        <option value="amazon">Amazon</option>
        <option value="google">Google</option>
      </select>
      <button className="ql-insertSpeak" title="Speak">
        <FaRegComment />
      </button>
      <DropDownBreak />
      <DropDownEmphasis />
      <button className="ql-insertWhisperingGoogle" title="Whispering">
        <IoIosVolumeLow size={30} />
      </button>
      <button className="ql-insertParagraph" title="Paragraph">
        <BiParagraph />
      </button>
      <DropDownSayAs />
      <DropDownDate />
      <button className="ql-insertSubstitute" title="Substitute">
        <BiPencil />
      </button>
      <button className="ql-insertSentence" title="Sentence">
        <i className="exclamation icon"></i>
      </button>
      {/*<button className="ql-insertPhoneme"><BiFont title="Phoneme"/></button>*/}
      <button className="ql-parse" title="Parse">
        <BiCodeAlt />
      </button>
    </div>
  );
}
CustomToolbarGoogle.propTypes = {
  platform: PropTypes.oneOf(["amazon", "google"]).isRequired,
};
