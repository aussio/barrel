/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
// Import React dependencies.
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Button from 'react-bootstrap/Button';
// Import the Slate editor factory.
import { createEditor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
// Import the Slate components and React plugin.
import {
  Editable, Slate, useSlateStatic, withReact,
} from 'slate-react';
import './App.css';
import logo from './logo.svg';
import RecoilExample from './recoil-example/Example';
import { getNoteFromStore, PARENT_EDITOR_KEY, setNoteInStore } from './store';

const EDITOR_TYPE = 'editor';

function App() {
  // const [state, setState] = useState({
  //   notes: [],
  //   isLoading: false,
  // })
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

  // function addNewNote() {
  //   setState({
  //     ...state,
  //     notes: [...state.notes, emptyNote],
  //   })
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        minWidth: '500px',
      }}
      >
        <ExampleEditor withAddButton editorKey={PARENT_EDITOR_KEY} />
      </div>
      <div style={{
        border: '1px solid grey',
        padding: '0.5rem',
        minWidth: '500px',
      }}
      >
        <RecoilExample />
      </div>
    </div>
  );
}

function InsertEditorButton({ editorKey, onClick }) {
  const editor = useSlateStatic();
  return (
    <Button
      variant="outline-primary"
      onMouseDown={(event) => {
        event.preventDefault();
        onClick();
        insertEditor(editor, editorKey);
      }}
    >
      Add Notecard:
      {' '}
      {editorKey}
    </Button>
  );
}

function insertEditor(editor, editorKey) {
  const editorNode = [
    {
      type: EDITOR_TYPE,
      // This can't be empty for a quirk of selection I believe. Unsure.
      children: [{ text: '' }],
      editorKey,
    },
    // Add some text space after Notecard, else you can't
    // insert text after it as there are no "text" nodes to select.
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
  Transforms.insertNodes(editor, editorNode);
}

const withEditableVoids = (editor) => {
  const { isVoid } = editor;
  const new_editor = editor;

  new_editor.isVoid = (element) => (element.type === EDITOR_TYPE ? true : isVoid(element));

  return new_editor;
};

function EditorWrapper({ attributes, children, editorKey }) {
  return (
    <div
      {...attributes}
      contentEditable={false}
      style={{
        border: '2px solid #5dabff',
        borderRadius: '0.25rem',
        padding: '0.5rem',
      }}
    >
      <ExampleEditor editorKey={editorKey} />
      {children}
    </div>
  );
}

function ExampleEditor({ withAddButton, editorKey }) {
  const editor = useMemo(() => withEditableVoids(withHistory(withReact(createEditor()))), []);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => {
    const { attributes, children, element } = props;
    switch (element.type) {
      case EDITOR_TYPE:
        return <EditorWrapper {...props} editorKey={element.editorKey} />;
      default:
        return <p {...attributes} style={{ margin: 0 }}>{children}</p>;
    }
  }, []);

  const initialValue = useMemo(
    () => getNoteFromStore(editorKey)
    // See this issue for why this can't be pulled into a const:
    // https://github.com/ianstormtaylor/slate/issues/3802
    || [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
    [editorKey],
  );

  useEffect(() => {
    let count = -1;
    for (let index = initialValue.length - 1; index >= 0; index -= 1) {
      const element = initialValue[index];
      if (element.type === EDITOR_TYPE) {
        count = element.editorKey;
        break;
      }
    }
    setNextEditorCounter(count + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [nextEditorCounter, setNextEditorCounter] = useState(0);

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== 'set_selection',
        );
        if (isAstChange) {
        // Save the value to Local Storage.
          setNoteInStore(editorKey, value);
        }
      }}
    >
      {withAddButton
        ? (
          <InsertEditorButton
            editorKey={nextEditorCounter}
            onClick={() => setNextEditorCounter((count) => count + 1)}
          />
        ) : null}
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={`editorKey=${editorKey}`}
        spellCheck
        autoFocus
      />
    </Slate>
  );
}

function Leaf({ attributes, children, leaf }) {
  let html_children;
  if (leaf.bold) {
    html_children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    html_children = <code>{children}</code>;
  }

  if (leaf.italic) {
    html_children = <em>{children}</em>;
  }

  if (leaf.underline) {
    html_children = <u>{children}</u>;
  }

  return <span {...attributes}>{html_children}</span>;
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
// const emptyNote = {
//   id: 'foo',
//   data: {
//     title: '',
//     editorContent: [{
//       type: 'paragraph',
//       children: [{ text: '' }],
//     }]
//   },
// }

export default App;
