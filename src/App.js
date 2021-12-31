import logo from './logo.svg'
import './App.css'

// Import React dependencies.
import React, { useMemo, useState, useCallback } from 'react'
import { createEditor, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import EditorRenderElement from './elements/elements'
import EditorRenderLeaf from './elements/leaves'

function EditorOnKeyDown(event, editor) {

  console.log(event.key)
  
  if (event.metaKey) {
    switch (event.key) {
      case 'c': {
      // Prevent the "`" from being inserted by default.
        event.preventDefault()
        // Determine whether any of the currently selected blocks are code blocks.
        const [match] = Editor.nodes(
          editor,
          {match: (n) => n.type === 'code'}
        )
        // Otherwise, set the currently selected blocks type to "code".
        Transforms.setNodes(
          editor,
          { type: match ? 'paragraph' : 'code' },
          { match: n => Editor.isBlock(editor, n) },
        )
        break
      }
      case 'b': {
        event.preventDefault()
        Transforms.setNodes(
          editor,
          { bold: true },
          // Apply it to text nodes, and split the text node up if the
          // selection is overlapping only part of it.
          {
            match: n => Text.isText(n),
            split: true,
          }
        )
        break
      }
      case 'i': {
        event.preventDefault()
        Transforms.setNodes(
          editor,
          { italic: true },
          // Apply it to text nodes, and split the text node up if the
          // selection is overlapping only part of it.
          {
            match: n => Text.isText(n),
            split: true,
          }
        )
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
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), [])
  // Keep track of state for the value of the editor.
  const [value, setValue] = useState(initialTestState)
  const callbackRenderElement = useCallback(EditorRenderElement, [])
  const callbackRenderLeaf = useCallback(EditorRenderLeaf, [])

  console.log(`value/state: ${JSON.stringify(value, null, 4)}`)

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
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