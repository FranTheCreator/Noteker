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
    const [ currentNote, setCurrentNote ] = useState(undefined);
    const [ removalConfirmation, setRemovalConfirmation ] = useState(false);
    const selectedNoteKey = useRef(undefined);

    const selectNote = (index) => {
        setCurrentNote(index);
        setEditing(true);
    }

    const handleTaskRemoval = (key) => {
        NotesIDB.deleteIDBData(key);
        setRemovalConfirmation(!removalConfirmation);
    }

    // console.log(currentNote)

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
        .finally(() => {
            setPreloadingState(false);
        });
    }, [editing, removalConfirmation])

    // console.log(notesContent)

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

            <div className="main-container">
                <AddTask openEditor={ () => setEditing(true) }/>
                { 
                    editing && 
                    <EditTask 
                        closeEditTask={ () => setEditing(false) } 
                        initTitle={ currentNote >= 0 ? notesContent[currentNote].title : "" } 
                        initText={ currentNote >= 0 ? notesContent[currentNote].text : "" } 
                    /> 
                }
                {
                    removalConfirmation &&
                    <ConfirmationModal closeModal={ () => setRemovalConfirmation(!removalConfirmation) } confirm={ () => handleTaskRemoval(selectedNoteKey.current) } />
                }
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
                {/* <Task taskTitle="Test 1"/> */}
            </div>
        </>
    )
}

export default App
