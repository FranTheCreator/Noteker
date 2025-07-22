import "./EditTask.css"
import { useRef, useState } from "react"
import * as NotesIDB from "../../IDB/IDB.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { Options } from "./Options/Options.jsx"


export const EditTask = ({ closeEditTask, initTitle, initText, initMode, taskId = undefined }) => {
    const [ viewMode, setViewMode ] = useState(initMode);
    const userTitleContent = useRef();
    const userTextContent = useRef();


    const saveChanges = (key) => {
        const titleToSave = userTitleContent.current.value;
        const textToSave = userTextContent.current.value;

        const titleToSaveLength = titleToSave.length;
        const textToSaveLength = textToSave.length;
        const isTitleToSaveEmpty = titleToSave.trim() === "";
        const isTextToSaveEmpty = textToSave.trim() === "";


        if ( isTitleToSaveEmpty && isTextToSaveEmpty ) return;
        if ( titleToSaveLength > 100 && textToSaveLength > 100000 ) return;
        
         
        if (key) {
            NotesIDB.modifyIDBData(key, {
                title: titleToSave,
                text: textToSave
            });
        }
        else { 
            NotesIDB.addDataToIDB({
                title: titleToSave,
                text: textToSave
            });
        }
    }

    const handleClick = () => {
        saveChanges(taskId);
        closeEditTask();
    }

    // const handleResize = (event) => {
    //     event.target.style.height = "auto";
    //     event.target.style.height =  event.target.scrollHeight + "px";
    // }


    return (
        <section className="task-editing">
            <button className="task-editing__return" onClick={ handleClick }>
                <FontAwesomeIcon icon={ faAngleLeft } /> Volver
            </button>
            
            <textarea 
                className="task-editing__title"
                disabled={ viewMode }
                defaultValue={ initTitle } 
                ref={ userTitleContent } 
                maxLength={ 100 } 
                placeholder="TITULO"
            ></textarea>
            <textarea 
                className="task-editing__text" 
                disabled={ viewMode }
                defaultValue={ initText } 
                ref={ userTextContent } 
                maxLength={ 100000 } 
                placeholder="Escribe aquí..."
            ></textarea>

            <Options viewMode={ viewMode } setViewMode={ () => setViewMode(!viewMode) } />
        </section>
    )
}