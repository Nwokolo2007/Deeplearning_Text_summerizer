import React, {useState} from 'react';
import {EditorState,ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../App.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';


export default function TextEditor({editorState, setEditorState})
{
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
      console.log('Editor', state.getCurrentContent().getPlainText())

  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  return (
    <div className="App">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        editorStyle={{ height: "32vh" }}
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  )
}