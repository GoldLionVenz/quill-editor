import React, {useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { IoIosStar, IoIosAdd } from "react-icons/io";
import PropTypes from 'prop-types';

/*
 * Event handler to be attached using Quill toolbar module
 * http://quilljs.com/docs/modules/toolbar/
 */
function insert(quill, start, end) {
  const cursorPositionFirst = quill.getSelection().index
  const cursorPositionLast =cursorPositionFirst+quill.getSelection().length+start.length
  quill.insertText(cursorPositionFirst, start)
  quill.insertText(cursorPositionLast, end)
  quill.setSelection(cursorPositionFirst + start.length)
}
 
/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => 
  
  (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1"></option>
      <option value="2"></option>
      <option defaultValue={"0"}></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option defaultValue="#fff"></option>
    </select>
    <button className="ql-insertStar">
      <IoIosStar /> 
    </button>
    <button className="ql-insertPlus">
      <IoIosAdd /> 
    </button>
  </div>
)
 
/*
 * Editor component with custom toolbar and content containers
 */
function Editor(props) {
  const [editorHtml, setEditorHtml]=useState('')
  const handleChange = (html) => {
    setEditorHtml(html)
  }
 
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          value={editorHtml}
          onChange={handleChange}
          placeholder={props.placeholder}
          modules={Editor.modules}
        />
      </div>
    )
}
 
/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */

Editor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      "insertStar": function() {
        insert(this.quill, '<emphasis level="strong">', '</emphasis>')
      },
      "insertPlus":function() {
        insert(this.quill, '<xd>', '</xd>')
      },
    }
  }
}
 
/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color',
]
 
/*
 * PropType validation
 */

Editor.propTypes = {
  placeholder: PropTypes.string,
}

export default Editor;