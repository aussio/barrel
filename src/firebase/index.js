// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyACV-5JOxou6Qvsth0VbPCGi07GnbosoRE',
  authDomain: 'notecards-project.firebaseapp.com',
  projectId: 'notecards-project',
  storageBucket: 'notecards-project.appspot.com',
  messagingSenderId: '349230955686',
  appId: '1:349230955686:web:05688866458b92325bc867',
  measurementId: 'G-KNECDL9ZKZ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestoreDB = getFirestore(app)

// Get a list of notes from your database
// Currently returning a list of: {title: "", editorContent: {}}
async function getAllNotes(db) {
  const notesSnapshot = await getDocs(collection(db, 'notes'))
  const notesList = notesSnapshot.docs.map((doc) => {
    const data = doc.data()
    if (data.editorContent) {
      data.editorContent = JSON.parse(data.editorContent)
    }
    return {id: doc.id, data: data}
  })
  return notesList
}

async function setNote(db, id, editorContent) {
  const notesRef = doc(db, 'notes', id)
  console.log(`Saving note ${id}`)
  console.log(`Saving content ${JSON.stringify(editorContent)}`)
  setDoc(
    notesRef,
    {
      editorContent: JSON.stringify(editorContent),
    },
    { merge: true },
  )
}


export {firestoreDB, getAllNotes, setNote}