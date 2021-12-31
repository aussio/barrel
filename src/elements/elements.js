// TODO - break into their own files.

import React from 'react'

// Define a rendering function based on the element passed to `props`. We use
// `useCallback` below to memoize the function for subsequent renders.
function EditorRenderElement(props) {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />
    default:
      return <DefaultElement {...props} />
  }
}

// Define a React component renderer for our code blocks.
function CodeElement(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

function DefaultElement(props) {
  return <p {...props.attributes}>{props.children}</p>
}

export default EditorRenderElement