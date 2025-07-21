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

    const isNewTask = currentTask.current >= 0;
    const isNewTitle = isNewTask ? notesContent[currentTask.current]?.title : "";
    const isNewText = isNewTask ? notesContent[currentTask.current]?.text : "";
    const isNewKey = isNewTask ? notesContent[currentTask.current]?.key : undefined;

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
        .catch( error => setTimeout(preload, 500) )
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

            <div className="main-container">
                <AddTask openEditor={ () => setEditing(true) }/>
                { 
                    editing && 
                    <EditTask 
                        closeEditTask={ closeEditTask } 
                        initTitle={ isNewTitle } 
                        initText={ isNewText } 
                        taskId={ isNewKey }
                    /> 
                }
                
                <div className="tasks-container">
                    <div className="task-wrapper">
                        {
                            notesContent.map( (contentObject, index) => (
                                <Task   taskTitle={ contentObject.title } 
                                        taskText={ contentObject.text }
                                        openTask={ () => selectNote(index) }
                                        showRemovalModal={ () => setShowRemovalModal(true) } 
                                        initCompletionState={ completedTasks && completedTasks[contentObject.key] }
                                        id={ contentObject.key }
                                        taskToRemove={ taskToRemove }
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
