import { useEffect, useRef, useState } from "react"
import { AddTask } from "./components"
import { Task } from "./components"
import { EditTask } from "./components"
import { ConfirmationModal } from "./components"
import * as NotesIDB from "./IDB/IDB.js"
import './App.css'


function App() {
    const [ notesContent, setNotesContent ] = useState([]);
    const [ preloading, setPreloadingState ] = useState(true);
    const [ editing, setEditing ] = useState(false);
    const [ removalConfirmation, setRemovalConfirmation ] = useState(false);
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
        setRemovalConfirmation(!removalConfirmation);
    }


    useEffect(() => {
        NotesIDB.readIDBData()
        .then(notes => {
            setNotesContent(notes);
            setPreloadingState(false);
        })
        .catch(err => {
            console.error("Error al leer la IDB:", err);
            setTimeout( () => preload(), 500);
        })
        // .finally(() => {
        //     // setPreloadingState(false);
        // });
    }, [editing, removalConfirmation])


    return (
        <>
            <div className={ `preload-screen ${ preloading ? "" : "preload-screen--loaded" }` }>
                <div className="preload">
                    <div className="preload__rotate rotate--r1">
                        <div className="dot"></div>
                    </div>
                    <div className="preload__rotate rotate--r2">
                        <div className="dot"></div>
                    </div>
                    <div className="preload__rotate rotate--r3">
                        <div className="dot"></div>
                    </div>
                    <div className="preload__rotate rotate--r4">
                        <div className="dot"></div>
                    </div>
                    <div className="preload__rotate rotate--r5">
                        <div className="dot"></div>
                    </div>
                </div>
            </div>

            {
                removalConfirmation &&
                <ConfirmationModal closeModal={ () => setRemovalConfirmation(!removalConfirmation) } confirm={ () => handleTaskRemoval(selectedNoteKey.current) } />
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
                    {
                        notesContent.map( (contentObject, index) => (
                            <Task   taskTitle={ contentObject.title } 
                                    openTask={ () => selectNote(index) }
                                    removalConfirmation={ () => setRemovalConfirmation(!removalConfirmation) } 
                                    id={ contentObject.key }
                                    removerId={ selectedNoteKey }
                                    key={ contentObject.key }
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default App
