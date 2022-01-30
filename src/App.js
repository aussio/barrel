/* eslint-disable no-unused-vars */
import logo from './logo.svg'
import './App.css'

// Import React dependencies.
import React, { useState, useEffect, useCallback } from 'react'
import { Editor, Text, Transforms } from 'slate'
import { Plate } from '@udecode/plate'
import {firestoreDB, getAllNotes, setNote} from './firebase'
import { debounce } from 'lodash'
import Alert from 'react-bootstrap/Alert'

import 'bootstrap/dist/css/bootstrap.min.css'



// Check if currently selected block is of type `type`.
function isBlockTypeActive(editor, type) {
  // For future me, this square bracket notation is pulling out the first value from the generator
  // that is returned from Editor.nodes. Unsure why just using something like [0] doesn't work. Maybe there
  // is a .next equivalent that is needed or something. :shrug:
  const [match] = Editor.nodes(editor, {
    match: n => n.type === type,
  })
  
  return !!match
}

// Toggle the currently selected blocks to newType.
function toggleBlock(editor, isActive, newType) {
  Transforms.setNodes(
    editor,
    { type: isActive ? null : newType },
    { match: n => Editor.isBlock(editor, n) }
  )
}


// Check if currently selected block is of type `type`.
function isBlockAttributeActive(editor, attribute) {
  const [match] = Editor.nodes(editor, {
    match: n => n[attribute] === true,
    universal: true
  })
  
  return !!match
}

// Toggle the currently selected blocks to `attribute`.
function toggleTextAttribute(editor, isActive, attribute) {
  Transforms.setNodes(
    editor,
    { [attribute]: isActive ? null : true },
    { match: n => Text.isText(n), split: true }
  )
}

function toggleCodeBlock(editor) {
  const isActive = isBlockTypeActive(editor, 'code')
  toggleBlock(editor, isActive, 'code')
}

function toggleBoldText(editor) {
  const isActive = isBlockAttributeActive(editor, 'bold')
  toggleTextAttribute(editor, isActive, 'bold')
}

function toggleItalicText(editor) {
  const isActive = isBlockAttributeActive(editor, 'italic')
  toggleTextAttribute(editor, isActive, 'italic')
}


function EditorOnKeyDown(event, editor) {
  
  if (event.metaKey) {
    switch (event.key) {
      case 'c': {
      // Prevent the "`" from being inserted by default.
        event.preventDefault()
        toggleCodeBlock(editor)
        break
      }
      case 'b': {
        event.preventDefault()
        toggleBoldText(editor)
        break
      }
      case 'i': {
        event.preventDefault()
        toggleItalicText(editor)
        break
      }
    }
  }
  if (event.key === '&') {
    // Prevent the ampersand character from being inserted.
    event.preventDefault()
    // Execute the `insertText` method when the event occurs.
    editor.insertText('and')
  }
}

function App() {
  const [state, setState] = useState({
    noteID: '',
    noteTitle: '',
    noteContent: [
      {
        'type': 'paragraph',
        'children': [
          {
            'text': 'Loading...'
          }
        ]
      }
    ],
    isLoaded: false,
  })
  const [showSaveAlert, setShowSaveAlert] = useState(true)
  
  const debounceCallback = useCallback(
    debounce((newState) => debounceHandler(newState), 1000),
    [])

  function debounceHandler(newState) {
    setNote(firestoreDB, newState)
    setShowSaveAlert(true)
    setTimeout(() => setShowSaveAlert(false), 1500)
  }
  
  function onChange(newValue) {
    setState({...state, noteContent: newValue})
    debounceCallback({...state, noteContent: newValue})
  }
  
  useEffect(() => {
    const fetchData = async () => {
      return await getAllNotes(firestoreDB)
    }
    fetchData()
      .then((allNotes) => {
        const note = allNotes[0]
        setState({
          noteID: note.id,
          noteTitle: note.data.title,
          noteContent: note.data.editorContent,
          isLoaded: true,
        })
      })
      .catch((err) => {console.log('Error fetching firebase notes', err)})
  }, [])
  
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <div className='editor-container'>
        {
          state.isLoaded ?
            <Plate
              id="1"
              initialValue={state.noteContent}
              onChange={onChange}
            >
            </Plate>
            :
            <Plate
              id="loading"
              initialValue={state.noteContent}
            >
            </Plate>
        }
      </div>
      <Alert show={showSaveAlert} variant="success">
          Saved
      </Alert>
    </div>
  )
}

export default App

function ToolBar({editor}) {
  return (
    <div>
      <button
        onMouseDown={event => {
          event.preventDefault()
          toggleBoldText(editor)
        }}
      >
      Bold
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault()
          toggleItalicText(editor)
        }}
      >
      Italic
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault()
          toggleCodeBlock(editor)
        }}
      >
      Code Block
      </button>
    </div>
  )
}




// eslint-disable-next-line no-unused-vars
const initialTestState = [
  {
    'type': 'paragraph',
    'children': [
      {
        'text': 'Another line.'
      }
    ]
  },
  {
    'type': 'paragraph',
    'children': [
      {
        'text': 'A line of '
      },
      {
        'text': 't',
        'italic': true
      },
      {
        'italic': true,
        'text': 'ext',
        'bold': true
      },
      {
        'text': ' in a p',
        'bold': true
      },
      {
        'text': 'aragraph.'
      }
    ]
  },
  {
    'type': 'paragraph',
    'children': [
      {
        'text': 'Yet another line.'
      }
    ]
  }
]