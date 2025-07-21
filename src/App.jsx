import './App.css'
import { useEffect, useRef, useState } from "react"
import * as NotesIDB from "./IDB/IDB.js"
import { PreloadScreen, AddTask, Task, EditTask, ConfirmationModal } from "./components"


function App() {
    const [ notesContent, setNotesContent ] = useState([]);
    const [ preloading, setPreloading ] = useState(true);
    const [ editing, setEditing ] = useState(false);
    const [ showRemovalModal, setShowRemovalModal ] = useState(false);
    const currentNote = useRef(undefined);
    const selectedNoteKey = useRef(undefined);


    const closeEditTask = () => {
        currentNote.current = undefined;
        setEditing(false);
    }

    const selectNote = (index) => {
        currentNote.current = index;
        setEditing(true);
    }

    const handleTaskRemoval = (key) => {
        NotesIDB.deleteIDBData(key);
        setShowRemovalModal(false);
    }

    const preload = () => {
        NotesIDB.readIDBData()
        .then(notes => {
            setNotesContent(notes);
            setPreloading(false);
        })
        .catch( error => setTimeout(preload, 500) )
    }


    useEffect(() => preload, [editing, showRemovalModal]);


    return (
        <>
            {
                preloading && <PreloadScreen />
            }

            {
                showRemovalModal &&
                <ConfirmationModal closeModal={ () => setShowRemovalModal(false) } confirm={ () => handleTaskRemoval(selectedNoteKey.current) } />
            }

            <div className="main-container">
                <AddTask openEditor={ () => setEditing(true) }/>
                { 
                    editing && 
                    <EditTask 
                        closeEditTask={ closeEditTask } 
                        initTitle={ currentNote.current >= 0 ? notesContent[currentNote.current]?.title : "" } 
                        initText={ currentNote.current >= 0 ? notesContent[currentNote.current]?.text : "" } 
                        taskId={ currentNote.current >= 0 ? notesContent[currentNote.current]?.key : undefined }
                    /> 
                }
                
                <div className="tasks-container">
                    <div className="task-wrapper">
                        {
                            notesContent.map( (contentObject, index) => (
                                <Task   taskTitle={ contentObject.title } 
                                        taskText={ contentObject.text }
                                        openTask={ () => selectNote(index) }
                                        removalConfirmation={ () => setShowRemovalModal(true) } 
                                        id={ contentObject.key }
                                        removerId={ selectedNoteKey }
                                        key={ contentObject.key }
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
