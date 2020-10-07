import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import ssmlCheck from "ssml-check";
import CustomToolbarAmazon from './custom-toolbar-amazon'
import CustomToolbarGoogle from './custom-toolbar-google'

function insert(quill, start, end) {
  const cursorPositionFirst = quill.getSelection().index;
  const cursorPositionLast = cursorPositionFirst + quill.getSelection().length + start.length;
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

/*
 * Editor component with custom toolbar and content containers
 */
function Editor(props) {
  const quillRef = useRef(null);
  const quillRefPrev = useRef(null);
  const [plataform, setPlataform] = useState("amazon");

  const handleChange = (html) => {
    let element = document.querySelector(".ql-container");
    let toolbar = document.querySelector("#toolbar")
    let ssmlDelta = quillRef.current.getEditor().getContents()
    let ssmlText = JSON.stringify(ssmlDelta);
    ssmlText = ssmlText.replace(/<[^>]*>/g, '');
    quillRefPrev.current.getEditor().setContents(JSON.parse(ssmlText));
    ssmlCheck
      .check(`${quillRef.current.getEditor().getText()}`, {
        platform: plataform,
        locale: 'en-AU'
      })
      .then((errors) => {
        if (errors) {
          element.style.border = "1pt solid red";
          toolbar.style.borderBottom="1pt solid red"
          console.log(JSON.stringify({ errors }));
        } else {
          element.style.border = "1pt solid #CCCCCC";
          toolbar.style.borderBottom="1pt solid #CCCCCC"
          console.log("SSML is clean");
          //setPlainText(quillRef.current.getEditor().getText().replace(/<[^>]*>/g, ''))
        }
      });
  };

  const modulesAmazon = {
    //toolbar: ssmlToolbarOptions,
    //'modules/rich-voice-editor':true
    toolbar: {
      container: "#toolbar",
      handlers: {
        selectPlatform: function(value){
          setPlataform(value)
          let element = document.querySelector(".ql-container");
          let toolbar = document.querySelector("#toolbar")
          ssmlCheck
          .check(`${quillRef.current.getEditor().getText()}`, {
            platform: value,
          })
          .then((errors) => {
            if (errors) {
              element.style.border = "1pt solid red";
              toolbar.style.borderBottom = "1pt solid red";
              console.log(JSON.stringify({ errors }));
            } else {
              element.style.border = "1pt solid #CCCCCC";
              toolbar.style.border = "1pt solid #CCCCCC";
              console.log("SSML is clean");
            }
          });
        },
        insertSpeak: function (props) {
          insert(this.quill, "<speak>", "</speak>");
        },
        insertSayAsNumber: function () {
          insert(this.quill, '<say-as interpret-as="number">', "</say-as>");
        },
        insertEmphasisStrong: function () {
          insert(this.quill, '<emphasis level="strong">', "</emphasis>");
        },
        insertDate: function (value) {
          if(value!=='Date')
          insert(
            this.quill,
            '<say-as interpret-as="date" format="' + value + '">',
            "</say-as>"
          );
        },
        insertBreak: function (value) {
          if(value!=='Break')
            insert(this.quill, '<break strength="' + value + '"/>', "");
        },
        insertEmphasis: function (value) {
          insert(this.quill, `<emphasis level="${value}">`, "</emphasis>");
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
          if(value!=='Say as')
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
        insertSentence: function () {
          insert(
            this.quill,
            '<s>',
            "</s>"
          );
        },
        insertWords: function (value) {
          insert(this.quill, `<w role="${value}">`, "</w>");
        },
        parse: function () {
          parse(this.quill);
        },
      },
    },
  };

  const modulesGoogle = {
    //toolbar: ssmlToolbarOptions,
    //'modules/rich-voice-editor':true
    toolbar: {
      container: "#toolbar",
      handlers: {
        selectPlatform: function(value){
          setPlataform(value)
          let element = document.querySelector(".ql-container");
          let toolbar = document.querySelector("#toolbar")

          ssmlCheck
          .check(`${quillRef.current.getEditor().getText()}`, {
            platform: value,
          })
          .then((errors) => {
            if (errors) {
              element.style.border = "1pt solid red";
              toolbar.style.borderBottom = "1pt solid red";
              console.log(JSON.stringify({ errors }));
            } else {
              element.style.border = "1pt solid #CCCCCC";
              toolbar.style.border = "1pt solid #CCCCCC";
              console.log("SSML is clean");
            }
          });
        },
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
          if(value!=='Date')
          insert(
            this.quill,
            '<say-as interpret-as="date" format="' + value + '">',
            "</say-as>"
          );
        },
        insertBreak: function (value) {
          if(value!=='Break')
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
        /*insertLanguage: function (value) {
          if(value!=='Languaje')
            insert(this.quill, '<lang xml:lang="' + value + '">', "</lang>");
        },*/
        insertParagraph: function () {
          insert(this.quill, "<p>", "</p>");
        },
        insertSayAs: function (value) {
          if(value!=='Say as')
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
        insertSentence: function () {
          insert(
            this.quill,
            '<s>',
            "</s>"
          );
        },
        /*insertPhoneme: function () {
          insert(
            this.quill,
            '<phoneme alphabet="ipa" ph="pɪˈkɑːn">',
            "</phoneme>"
          );
        },*/
        parse: function () {
          parse(this.quill);
        },
      },
    },
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
      //value={editorHtml}
      onChange={handleChange}
      placeholder={props.placeholder}
      modules={plataform === "amazon"?modulesAmazon:modulesGoogle}
      id="editor"
    />
    <ReactQuill
      ref={quillRefPrev}
      style={{marginTop:50, borderTop:"1pt solid #CCCCCC"}}
      readOnly
      modules={{
        toolbar:false
      }}
      placeholder={props.placeholder}
      id="editor"
    />
  </div>
);

}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */

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
