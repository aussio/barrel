import logo from './logo.svg'
import './App.css'

// Import React dependencies.
import React, { useMemo, useState, useCallback } from 'react'
import { createEditor, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import EditorRenderElement from './elements/elements'
import EditorRenderLeaf from './elements/leaves'


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

function onChange(editor, setValueFunc, newValue) {
  setValueFunc(newValue)

  const isASTChange = editor.operations.some(
    op => 'set_selection' !== op.type
  )

  if (isASTChange) {
    // Save the value to Local Storage.
    const valueJSON = JSON.stringify(newValue)
    localStorage.setItem('editorContent', valueJSON)
  }
}

function App() {
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), [])
  // Keep track of state for the value of the editor.
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem('editorContent')) || initialTestState
  )
  const callbackRenderElement = useCallback(EditorRenderElement, [])
  const callbackRenderLeaf = useCallback(EditorRenderLeaf, [])

  console.log(`value/state: ${JSON.stringify(value, null, 4)}`)

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => onChange(editor, setValue, value)}
      >
        <ToolBar editor={editor} />
        <Editable
          onKeyDown={(event) => EditorOnKeyDown(event, editor)}
          renderLeaf={callbackRenderLeaf}
          renderElement={callbackRenderElement}
        />
      </Slate>
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