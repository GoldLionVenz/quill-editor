import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import { IoIosVolumeHigh, IoIosVolumeLow } from "react-icons/io";
import { BiParagraph, BiPencil, BiFont, BiCodeAlt } from "react-icons/bi";
//import { FaPodcast } from "react-icons/fa"
import { FaRegComment } from "react-icons/fa";
import PropTypes from "prop-types";
import ssmlCheck from "ssml-check";
function insert(quill, start, end) {
  const cursorPositionFirst = quill.getSelection().index;
  const cursorPositionLast =
    cursorPositionFirst + quill.getSelection().length + start.length;
  quill.insertText(cursorPositionFirst, start);
  quill.insertText(cursorPositionLast, end);
  quill.setSelection(cursorPositionFirst + start.length);
}
function parse(quill) {
  var editorContent = quill.getContents().ops;
  // loop blocks, change in formatting causes new block
  editorContent.forEach(function (block) {
    // if formatting is bold emphasis text
    if (block.attributes && block.attributes.bold) {
      block.insert = '<emphasis level="strong">' + block.insert + "</emphasis>";
    }
    // if formatting is underline emphasis text
    if (block.attributes && block.attributes.underline) {
      block.insert = '<emphasis level="strong">' + block.insert + "</emphasis>";
    }
    // add breaks before linebreaks for better timing
    block.insert = block.insert.replace(
      /(?:\r\n|\r|\n)/g,
      '<break strength="x-strong"/>\n'
    );
  });
  // add <speak> text at the beginning
  editorContent.unshift({ insert: "<speak>\n" });
  // add </speak> text at the end
  editorContent.push({ insert: "</speak>" });
  // update editor with parsed SSML text
  quill.setContents(editorContent);
}
const ssml_breaks = ["weak", "strong", "x-strong"];
const ssml_languages = [
  "en-US",
  "en-GB",
  "de-DE",
  "es-ES",
  "fr-FR",
  "it-IT",
  "nl-NL",
  "ru-RU",
  "tr-TR",
];
const ssml_dates = ["mdy", "dmy", "ymd", "md", "dm", "ym", "my", "d", "m", "y"];
const ssml_sayAs = [
  "spell-out",
  "number",
  "ordinal",
  "digits",
  "fraction",
  "expletive",
];
/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbarAmazon = (props) => {
  return (
    <div id="toolbar">
      <select
        style={{ display: "inline" }}
        value={props.plataform}
        onChange={(e) => props.setPlataform(e.target.value)}
      >
        <option value="amazon" className="ql-ssml_date">
          Amazon
        </option>
        <option value="google" className="ql-ssml_date">
          Google
        </option>
      </select>
      <button className="ql-insertSpeak">
        <FaRegComment />
      </button>
      <select className="ql-insertBreak ql-header">
        {ssml_breaks.map((breakOption) => (
          <option
            key={breakOption}
            value={breakOption}
            className="ql-ssml_date"
          >
            {breakOption}
          </option>
        ))}
      </select>
      <button className="ql-insertEmphasis">
        <IoIosVolumeHigh />
      </button>
      {props.plataform === "amazon" ? (
        <button className="ql-insertWhisperingAmazon">
          <IoIosVolumeLow />
        </button>
      ) : (
        <button className="ql-insertWhisperingGoogle">
          <IoIosVolumeLow />
        </button>
      )}
      <select className="ql-insertLanguage ql-header">
        {ssml_languages.map((language) => (
          <option key={language} value={language} className="ql-ssml_date">
            {language}
          </option>
        ))}
      </select>
      <button className="ql-insertParagraph">
        <BiParagraph />
      </button>
      <select className="ql-insertSayAs ql-header">
        {ssml_sayAs.map((say) => (
          <option key={say} value={say} className="ql-ssml_date">
            {say}
          </option>
        ))}
      </select>
      <select className="ql-insertDate ql-header">
        {ssml_dates.map((date) => (
          <option key={date} value={date} className="ql-ssml_date">
            {date}
          </option>
        ))}
      </select>
      <button className="ql-insertSubstitute" title="Substitute">
        <BiPencil />
      </button>
      <button className="ql-insertPhoneme" title="Substitute">
        <BiFont />
      </button>
      <button className="ql-parse" title="Substitute">
        <BiCodeAlt />
      </button>
    </div>
  );
};

const CustomToolbarGoogle = (props) => {
  return (
    <div id="toolbar">
      <select
        style={{ display: "inline" }}
        value={props.plataform}
        onChange={(e) => props.setPlataform(e.target.value)}
      >
        <option value="amazon" className="ql-ssml_date">
          Amazon
        </option>
        <option value="google" className="ql-ssml_date">
          Google
        </option>
      </select>
      <button className="ql-insertSpeak">
        <FaRegComment />
      </button>
      <select className="ql-insertBreak ql-header">
        {ssml_breaks.map((breakOption) => (
          <option
            key={breakOption}
            value={breakOption}
            className="ql-ssml_date"
          >
            {breakOption}
          </option>
        ))}
      </select>
      <button className="ql-insertEmphasis">
        <IoIosVolumeHigh />
      </button>
      <button className="ql-insertWhisperingGoogle">
        <IoIosVolumeLow />
      </button>
      <select className="ql-insertLanguage ql-header">
        {ssml_languages.map((language) => (
          <option key={language} value={language} className="ql-ssml_date">
            {language}
          </option>
        ))}
      </select>
      <button className="ql-insertParagraph">
        <BiParagraph />
      </button>
      <select className="ql-insertSayAs ql-header">
        {ssml_sayAs.map((say) => (
          <option key={say} value={say} className="ql-ssml_date">
            {say}
          </option>
        ))}
      </select>
      <select className="ql-insertDate ql-header">
        {ssml_dates.map((date) => (
          <option key={date} value={date} className="ql-ssml_date">
            {date}
          </option>
        ))}
      </select>
      <button className="ql-insertSubstitute" title="Substitute">
        <BiPencil />
      </button>
      <button className="ql-insertPhoneme" title="Substitute">
        <BiFont />
      </button>
      <button className="ql-parse" title="Substitute">
        <BiCodeAlt />
      </button>
    </div>
  );
};
/*
 * Editor component with custom toolbar and content containers
 */
function Editor(props) {
  const [editorHtml, setEditorHtml] = useState("");
  const quillRef = useRef(null);
  const [plataform, setPlataform] = useState("amazon");
  const handleChange = (html) => {
    setEditorHtml(html);
    let element = document.querySelector(".ql-container");
    console.log("ref", `${quillRef.current.getEditor().getText()}`);

    ssmlCheck
      .check(`${quillRef.current.getEditor().getText()}`, {
        platform: plataform,
      })
      .then((errors) => {
        if (errors) {
          element.style.border = "1pt solid red";
          console.log(JSON.stringify({ errors }));
        } else {
          element.style.border = "1pt solid gray";
          console.log("SSML is clean");
        }
      });
  };

  return (
    <div className="text-editor">
      {plataform === "amazon" ? (
        <CustomToolbarAmazon
          plataform={plataform}
          setPlataform={(newPlataform) => setPlataform(newPlataform)}
        />
      ) : (
        <CustomToolbarGoogle
          plataform={plataform}
          setPlataform={(newPlataform) => setPlataform(newPlataform)}
        />
      )}
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={handleChange}
        placeholder={props.placeholder}
        modules={plataform === "amazon"?Editor.modulesAmazon:Editor.modulesGoogle}
        id="editor"
      />
    </div>
  );
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */

Editor.modulesAmazon = {
  //toolbar: ssmlToolbarOptions,
  //'modules/rich-voice-editor':true
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertSpeak: function (props) {
        console.log(props)
        insert(this.quill, "<speak>", "</speak>");
      },
      insertSayAsNumber: function () {
        insert(this.quill, '<say-as interpret-as="number">', "</say-as>");
      },
      insertEmphasisStrong: function () {
        insert(this.quill, '<emphasis level="strong">', "</emphasis>");
      },
      insertDate: function (value) {
        insert(
          this.quill,
          '<say-as interpret-as="date" format="' + value + '">',
          "</say-as>"
        );
      },
      insertBreak: function (value) {
        insert(this.quill, '<break strength="' + value + '"/>', "");
      },
      insertEmphasis: function () {
        insert(this.quill, '<emphasis level="strong">', "</emphasis>");
      },
      insertWhisperingAmazon: function () {
        insert(
          this.quill,
          '<amazon:effect name="whispered">',
          "</amazon:effect>"
        );
      },
      insertWhisperingGoogle: function () {
        insert(this.quill, '<emphasis level="reduced">', "</emphasis>");
      },
      insertLanguage: function (value) {
        insert(this.quill, '<lang xml:lang="' + value + '">', "</lang>");
      },
      insertParagraph: function () {
        insert(this.quill, "<p>", "</p>");
      },
      insertSayAs: function (value) {
        insert(
          this.quill,
          '<say-as interpret-as="' + value + '">',
          "</say-as>"
        );
      },
      insertSubstitute: function () {
        insert(
          this.quill,
          '<sub alias="Enter Substitute Text Here">',
          "</sub>"
        );
      },
      insertBreath: function () {
        insert(this.quill, "<amazon:auto-breaths>", "</amazon:auto-breaths>");
      },
      insertPhoneme: function () {
        insert(
          this.quill,
          '<phoneme alphabet="ipa" ph="pɪˈkɑːn">',
          "</phoneme>"
        );
      },
      parse: function () {
        parse(this.quill);
      },
    },
  },
};
Editor.modulesGoogle = {
  //toolbar: ssmlToolbarOptions,
  //'modules/rich-voice-editor':true
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertSpeak: function () {
        console.log(this.props)
        insert(this.quill, "<speak>", "</speak>");
      },
      insertSayAsNumber: function () {
        insert(this.quill, '<say-as interpret-as="number">', "</say-as>");
      },
      insertEmphasisStrong: function () {
        insert(this.quill, '<emphasis level="strong">', "</emphasis>");
      },
      insertDate: function (value) {
        insert(
          this.quill,
          '<say-as interpret-as="date" format="' + value + '">',
          "</say-as>"
        );
      },
      insertBreak: function (value) {
        insert(this.quill, '<break strength="' + value + '"/>', "");
      },
      insertEmphasis: function () {
        insert(this.quill, '<emphasis level="strong">', "</emphasis>");
      },
      insertWhisperingAmazon: function () {
        insert(
          this.quill,
          '<amazon:effect name="whispered">',
          "</amazon:effect>"
        );
      },
      insertWhisperingGoogle: function () {
        insert(this.quill, '<emphasis level="reduced">', "</emphasis>");
      },
      insertLanguage: function (value) {
        insert(this.quill, '<lang xml:lang="' + value + '">', "</lang>");
      },
      insertParagraph: function () {
        insert(this.quill, "<p>", "</p>");
      },
      insertSayAs: function (value) {
        insert(
          this.quill,
          '<say-as interpret-as="' + value + '">',
          "</say-as>"
        );
      },
      insertSubstitute: function () {
        insert(
          this.quill,
          '<sub alias="Enter Substitute Text Here">',
          "</sub>"
        );
      },
      insertBreath: function () {
        insert(this.quill, "<amazon:auto-breaths>", "</amazon:auto-breaths>");
      },
      insertPhoneme: function () {
        insert(
          this.quill,
          '<phoneme alphabet="ipa" ph="pɪˈkɑːn">',
          "</phoneme>"
        );
      },
      parse: function () {
        parse(this.quill);
      },
    },
  },
};


/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

/*
 * PropType validation
 */

Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;
