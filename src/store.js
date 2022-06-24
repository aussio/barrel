export const PARENT_EDITOR_KEY = 'note-content'
export const STORE_NOTES_KEY = 'store-notes'

/**
 * Overall Store shape:
 * {
 * 'notes':
 *    Map({
 *      'editorKey1': {content...}
 *    })
 * 'notecards':
 *    Map({
 *      'editorKey1': {content...}
 *    })
 * }
 */

function getAllNotesFromStore() {
  return new Map(JSON.parse(localStorage.getItem(STORE_NOTES_KEY)));
}

export function getNoteFromStore(editorKey) {
  const all_notes = getAllNotesFromStore()
  return all_notes.get(editorKey)
}

export function setNoteInStore(editorKey, content) {
  // const note_value = JSON.stringify(content)
  const note_value = content
  
  const all_notes = getAllNotesFromStore()
  all_notes.set(editorKey, note_value)
  
  const all_notes_value = JSON.stringify(Array.from(all_notes))
  
  return localStorage.setItem(STORE_NOTES_KEY, all_notes_value)
}
