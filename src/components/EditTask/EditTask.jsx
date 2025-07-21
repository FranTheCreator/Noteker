import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"
import { Options } from "./Options/Options.jsx"
import * as NotesIDB from "../../IDB/IDB.js"
import "./EditTask.css"


export const EditTask = ({ closeEditTask, initTitle, initText, taskId = undefined }) => {
    if ( initTitle === null || initTitle === undefined ) initTitle = "";
    if ( initText === null || initText === undefined ) initText  = "";


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
        
        if( titleToSaveLength <= 100 && textToSaveLength <= 100000 ) { 
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
    }

    const handleClick = () => {
        saveChanges(taskId);
        closeEditTask();
    }

    const handleResize = (event) => {
        event.target.style.height = "auto";
        event.target.style.height =  event.target.scrollHeight + "px";
    }


    return (
        <section className="task-editing">
            <button className="task-editing__return" onClick={ handleClick }>
                <FontAwesomeIcon icon={ faAngleLeft } /> Volver
            </button>
            
            <textarea 
                className="task-editing__title"
                onInput={ handleResize } 
                defaultValue={ initTitle } 
                ref={ userTitleContent } 
                maxLength={ 100 } 
                placeholder="TITULO"
            ></textarea>
            <div className="task-editing__content" >
                <textarea 
                    className="task-editing__text" 
                    onInput={ handleResize } 
                    defaultValue={ initText } 
                    ref={ userTextContent } 
                    maxLength={ 100000 } 
                    placeholder="Escribe aquí..."
                ></textarea>
            </div>

            <Options />
        </section>
    )
}