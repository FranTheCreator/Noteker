import './App.css'
import { useEffect, useRef, useState } from "react"
import * as NotesIDB from "./IDB/IDB.js"
import { PreloadScreen, AddTask, Task, EditTask, ConfirmationModal } from "./components"


function App() {
    const [ notesContent, setNotesContent ] = useState([]);
    const [ preloading, setPreloading ] = useState(true);
    const [ editing, setEditing ] = useState(false);
    const [ showRemovalModal, setShowRemovalModal ] = useState(false);

    const currentTask = useRef(undefined);
    const taskToRemove = useRef(undefined);

    const isTaskSelected = currentTask.current >= 0;
    const isNewTitle = isTaskSelected ? notesContent[currentTask.current]?.title : "";
    const isNewText = isTaskSelected ? notesContent[currentTask.current]?.text : "";
    const isNewKey = isTaskSelected ? notesContent[currentTask.current]?.key : undefined;
    const isPopUpFocused = editing || showRemovalModal;

    const completedTasks = JSON.parse(localStorage.getItem("completedTasks"));

    const closeEditTask = () => {
        currentTask.current = undefined;
        setEditing(false);
    }

    const selectNote = (index) => {
        currentTask.current = index;
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
        .catch( () => setTimeout(preload, 500) )
    }


    if (!completedTasks) localStorage.setItem("completedTasks", JSON.stringify({}));

    useEffect(() => preload, [editing, showRemovalModal]);


    return (
        <>
            {
                preloading && <PreloadScreen />
            }

            {
                showRemovalModal &&
                <ConfirmationModal closeModal={ () => setShowRemovalModal(false) } confirm={ () => handleTaskRemoval(taskToRemove.current) } />
            }

            <main className="main-container" tabIndex={ -1 }>
                <AddTask openEditor={ () => setEditing(true) } disableTabIndex={ isPopUpFocused }/>
                { 
                    editing && 
                    <EditTask 
                        closeEditTask={ closeEditTask } 
                        initTitle={ isNewTitle } 
                        initText={ isNewText } 
                        initMode={ isTaskSelected }
                        taskId={ isNewKey }
                    /> 
                }
                
                <section className="tasks-container" tabIndex={ -1 }>
                    <div className="task-wrapper">
                        {
                            notesContent.map( (contentObject, index) => (
                                <Task   taskTitle={ contentObject.title } 
                                        taskText={ contentObject.text }
                                        openTask={ () => selectNote(index) }
                                        showRemovalModal={ () => setShowRemovalModal(true) } 
                                        initCompletionState={ completedTasks && completedTasks[contentObject.key] }
                                        disableTabIndex={ isPopUpFocused }
                                        id={ contentObject.key }
                                        taskToRemove={ taskToRemove }
                                        key={ contentObject.key }
                                />
                            ))
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default App
