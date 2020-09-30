import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoIosAdd, IoIosAirplane, IoIosVolumeHigh, IoIosVolumeLow } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import PropTypes from "prop-types";
import ssmlCheck from "ssml-check";
/*
 * Event handler to be attached using Quill toolbar module
 * http://quilljs.com/docs/modules/toolbar/
 */
function insert(quill, start, end) {
  const cursorPositionFirst = quill.getSelection().index;
  const cursorPositionLast =
    cursorPositionFirst + quill.getSelection().length + start.length;
  quill.insertText(cursorPositionFirst, start);
  quill.insertText(cursorPositionLast, end);
  quill.setSelection(cursorPositionFirst + start.length);
}
var ssmlToolbarOptions = {
  container: [
    ["ssml_speak"], // Add this.
    [{ ssml_break: ["weak", "strong", "x-strong"] }], // Add this.
    ["ssml_emphasis"], // Add this.
    ["ssml_whispering"], // Add this.
    [
      {
        ssml_language: [
          "en-US",
          "en-GB",
          "de-DE",
          "es-ES",
          "fr-FR",
          "it-IT",
          "nl-NL",
          "ru-RU",
          "tr-TR",
        ],
      },
    ], // Add this.
    ["ssml_paragraph"], // Add this.
    [
      {
        ssml_sayas: [
          "spell-out",
          "number",
          "ordinal",
          "digits",
          "fraction",
          "expletive",
        ],
      },
    ], // Add this.
    [
      {
        ssml_date: ["mdy", "dmy", "ymd", "md", "dm", "ym", "my", "d", "m", "y"],
      },
    ], // Add this.
    ["ssml_substitute"], // Add this.
    ["ssml_breaths"], // Add this.
    ["ssml_phoneme"], // Add this.
    ["ssml_parse"], // Add this.
    ["ssml_validate"], // Add this.
  ],
  handlers: {
    ssml_speak: function () {}, // Add this.
    ssml_break: function () {}, // Add this.
    ssml_emphasis: function () {}, // Add this.
    ssml_language: function () {}, // Add this.
    ssml_paragraph: function () {}, // Add this.
    ssml_sayas: function () {}, // Add this.
    ssml_date: function () {}, // Add this.
    ssml_substitute: function () {}, // Add this.
    ssml_breaths: function () {}, // Add this.
    ssml_phoneme: function () {}, // Add this.
    ssml_whispering: function () {}, // Add this.
    ssml_parse: function () {}, // Add this.
    ssml_validate: function () {}, // Add this.
  },
};
const ssml_breaks= ["weak", "strong", "x-strong"]
const ssml_languages= [
  "en-US",
  "en-GB",
  "de-DE",
  "es-ES",
  "fr-FR",
  "it-IT",
  "nl-NL",
  "ru-RU",
  "tr-TR",
]
const ssml_dates = ["mdy", "dmy", "ymd", "md", "dm", "ym", "my", "d", "m", "y"];

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <button className="ql-insertSpeak">
      <FaRegComment />
    </button>
    <select className="ql-insertBreak ql-header">
      {ssml_breaks.map((breakOption) => (
        <option value={breakOption} className="ql-ssml_date">
          {breakOption}
        </option>
      ))}
    </select>
    <button className="ql-insertEmphasis">
      <IoIosVolumeHigh/>
    </button>
    <button className="ql-insertWhispering">
      <IoIosVolumeLow/>
    </button>
    <select className="ql-insertLanguage ql-header">
      {ssml_languages.map((languages) => (
        <option value={languages} className="ql-ssml_date">
          {languages}
        </option>
      ))}
    </select>
    <button className="ql-insertParagraph">
      <IoIosVolumeLow/>
    </button>
    <select className="ql-insertDate ql-header">
      {ssml_dates.map((date) => (
        <option value={date} className="ql-ssml_date">
          {date}
        </option>
      ))}
    </select>

    <button className="ql-insertSayAsNumber">
      <IoIosAdd />
    </button>
    <button className="ql-insertEmphasisStrong">
      <IoIosAirplane />
    </button>
  </div>
);

/*
 * Editor component with custom toolbar and content containers
 */
function Editor(props) {
  const [editorHtml, setEditorHtml] = useState("");
  const quillRef = useRef(null);
  const handleChange = (html) => {
    setEditorHtml(html);
    let element = document.querySelector(".ql-container");
    console.log("ref", `${quillRef.current.getEditor().getText()}`);

    ssmlCheck
      .check(`${quillRef.current.getEditor().getText()}`, {
        platform: "amazon"
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
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={handleChange}
        placeholder={props.placeholder}
        modules={Editor.modules}
        id="editor"
      />
    </div>
  );
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */

Editor.modules = {
  //toolbar: ssmlToolbarOptions,
  //'modules/rich-voice-editor':true
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertSpeak: function () {
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
        insert(
          this.quill,
          '<break strength="' + value + '"/>',
          ""
        );
      },
      insertEmphasis: function () {
        insert(this.quill, '<emphasis level="strong">', "</emphasis>");
      },
      insertWhispering: function () {
        insert(this.quill, '<amazon:effect name="whispered">', "</amazon:effect>");
      },
      insertLanguage:function (value) {
        insert(this.quill, '<lang xml:lang="' + value + '">', "</lang>");
      },
      insertParagraph: function () {
        insert(this.quill, '<p>', "</p>");
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
