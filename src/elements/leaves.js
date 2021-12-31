import React from 'react'

// Define a leaf rendering function that is memoized with `useCallback`.
function EditorRenderLeaf(props) {
  return <Leaf {...props} />
}

function Leaf({ attributes, children, leaf }) {
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? 'bold' : 'normal',
        fontStyle: leaf.italic ? 'italic' : 'normal',
      }}
    >
      {children}
    </span>
  )
}

export default EditorRenderLeaf