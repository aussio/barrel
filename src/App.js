/* eslint-disable no-unused-vars */
import logo from './logo.svg'
import './App.css'

// Import React dependencies.
import React, { useState, useEffect, useCallback, useMemo } from 'react'
// Import the Slate editor factory.
import { createEditor, Transforms, Editor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlateStatic } from 'slate-react'
import { withHistory } from 'slate-history'

import {firestoreDB, getAllNotes, setNote} from './firebase'
import { debounce } from 'lodash'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  const [state, setState] = useState({
    notes: [],
    isLoading: false,
  })
  const [editor] = useState(() => withSubEditors(withHistory(withReact(createEditor()))))
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     return await getAllNotes(firestoreDB)
  //   }
  //   fetchData()
  //     .then((allNotes) => {
  //       setState({
  //         notes: allNotes,
  //         isLoading: false,
  //       })
  //     })
  //     .catch((err) => {console.log('Error fetching firebase notes', err)})
  // }, [])

  function addNewNote() {
    setState({
      ...state,
      notes: [...state.notes, emptyNote],
    })
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      {/* {
        state.isLoading ?
          <SlateEditor
            id="loading"
            value={[]}
          />
          :
          state.notes.map((note) => {
            console.log(`map iter ${note.id}`)
            return (
              <SlateEditor
                key={note.id}
                id={note.id}
                title={note.data.title}
                value={note.data.editorContent}
              />
            )
          })
      } */}
      <div style={{
        border: '1px solid grey',
        padding: '0.5rem',
        minWidth: '500px'
      }}>
        <ExampleEditor withAddButton/>
      </div>
    </div>
  )
}

function withSubEditors(editor) {
  const { isEditor } = editor

  editor.isEditor = element => {
    return element.type === 'editor' ? true : isEditor(element)
  }

  return editor
}

function InsertEditorButton() {
  const editor = useSlateStatic()
  return (
    <Button
      variant="outline-primary"
      onMouseDown={event => {
        event.preventDefault()
        insertEditor(editor)
      }}
    >
      Add Note
    </Button>
  )
}

function insertEditor(editor) {
  const editorNode = [
    {
      type: 'editor',
      children: [{ text: 'what' }]
    },
    // Add some text space after Notecard, else you can't
    // insert text after it as there are no "text" nodes to select.
    emptyParagraph,
  ]
  Transforms.insertNodes(editor, editorNode)
}

const withEditableVoids = editor => {
  const { isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'editor' ? true : isVoid(element)
  }

  return editor
}


function SubEditor({ attributes, children }) {
  return (
    <div
      {...attributes} contentEditable={false}
      style={{
        border: '2px solid #5dabff',
        borderRadius: '0.25rem',
        padding: '0.5rem',
      }}
    >
      <ExampleEditor />
      {children}
    </div>
  )
}

function ExampleEditor({withAddButton}) {
  const editor = useMemo(() => withEditableVoids(withHistory(withReact(createEditor()))), [])
  
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const renderElement = useCallback(props => {
    const { attributes, children, element } = props
  
    switch (element.type) {
      case 'editor':
        return <SubEditor {...props} />
      default:
        return <p {...attributes} style={{margin: 0}}>{children}</p>
    }
  }, [])

  return (
    <Slate
      editor={editor}
      value={[emptyParagraph]}
      // onChange={
      // value => {
      // const isAstChange = editor.operations.some(
      //   op => 'set_selection' !== op.type
      // )
      // if (isAstChange) {
      //   // Save the value to Local Storage.
      //   const content = JSON.stringify(value)
      //   localStorage.setItem('content', content)
      // }
      // }
      // }
    >
      {withAddButton ? <InsertEditorButton /> : null}
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="ExampleEditor()..."
        spellCheck
        autoFocus
      />
    </Slate>
  )
}


const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}


// function PlateEditor({id, title, initialValue}) {

//   const [state, setState] = useState({
//     id: id,
//     title: title,
//     editorContent: initialValue,
//   })

//   console.log(id, initialValue)

//   const [showSaveAlert, setShowSaveAlert] = useState(false)

//   const debounceCallback = useCallback(
//     debounce((newState) => debounceHandler(newState), 1000),
//     [])

//   function debounceHandler(newState) {
//     setNote(firestoreDB, id, newState)
//     setShowSaveAlert(true)
//     setTimeout(() => setShowSaveAlert(false), 1500)
//   }
  
//   function onChange(newValue) {
//     setState({...state, noteContent: newValue})
//     debounceCallback({...state, noteContent: newValue})
//   }

//   return (
//     <div className='editor-container'>
//       <h3>{title}</h3>
//       <Plate
//         id={id}
//         initialValue={initialValue}
//         onChange={onChange}
//       >
//       </Plate>
//       <div className="saved-alert">
//         <Alert show={showSaveAlert} variant="success">
//           Saved
//         </Alert>
//       </div>
//     </div>
//   )
// }

const emptyParagraph = {
  type: 'paragraph',
  children: [{ text: '' }],
}

const emptyNote = {
  id: 'foo',
  data: {
    title: '',
    editorContent: [emptyParagraph]
  },
}

export default App
