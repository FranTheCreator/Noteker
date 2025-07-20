import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"
import { Options } from "./Options/Options.jsx"
import * as NotesIDB from "../../IDB/IDB.js"
import "./EditTask.css"


export const EditTask = ({ closeEditTask, initTitle, initText }) => {
    if ( initTitle === "" || initTitle === null || initTitle === undefined ) initTitle = "TITULO";
    if ( initText === "" || initText === null || initText === undefined ) initText  = "...";


    const userTitleContent = useRef();
    const userTextContent = useRef();
    // console.log("render");

    const saveChanges = () => {
        NotesIDB.addDataToIDB({
            title: userTitleContent.current.textContent,
            text: userTextContent.current.textContent
        });
    }

    const handleClick = () => {
        saveChanges()
        closeEditTask()
    }

    return (
        <section className="task-editing">
            <button className="task-editing__return" onClick={ handleClick }>
                <FontAwesomeIcon icon={ faAngleLeft } /> Volver
            </button>
            
            <h1 className="task-editing__title" contentEditable ref={ userTitleContent } >
                { initTitle }
            </h1>
            <div className="task-editing__content">
                <div className="task-editing__text" contentEditable ref={ userTextContent } >
                    { initText }
                </div>
            </div>

            <Options />
        </section>
    )
}