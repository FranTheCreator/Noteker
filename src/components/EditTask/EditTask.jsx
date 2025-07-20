import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"
import { Options } from "./Options/Options.jsx"
import * as NotesIDB from "../../IDB/IDB.js"
import "./EditTask.css"


export const EditTask = ({ closeEditTask, initTitle, initText, taskId = undefined }) => {
    if ( initTitle === "" || initTitle === null || initTitle === undefined ) initTitle = "TITULO";
    if ( initText === "" || initText === null || initText === undefined ) initText  = "...";


    const userTitleContent = useRef();
    const userTextContent = useRef();
    // console.log("render");

    // function getTextWithNewlinesFromContenteditable(div) {
    //     return div.innerHTML
    //         .replace(/<br\s*\/?>/gi, "\n")
    //         .replace(/<\/div>\s*<div>/gi, "\n")
    //         .replace(/<\/?[^>]+(>|$)/g, "")
    //         // .trim()
    // }

    const saveChanges = (key) => {
        // console.log(userTextContent.current.value.length > 100000)
        if(userTextContent.current.value.length > 100000 || userTitleContent.current.value.length > 100000) return;
        else {
            if (key) {
                // console.log(userTextContent.current.value.length)
                NotesIDB.modifyIDBData(key, {
                    title: userTitleContent.current.value,
                    text: userTextContent.current.value
                })
            }
            else { 
                // console.log(userTextContent.current.value.length)
                NotesIDB.addDataToIDB({
                    title: userTitleContent.current.value,
                    text: userTextContent.current.value
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
            
            <textarea className="task-editing__title" onInput={ handleResize } defaultValue={ initTitle } ref={ userTitleContent } maxLength={ 100 } ></textarea>
            <div className="task-editing__content" >
                <textarea className="task-editing__text" onInput={ handleResize } defaultValue={ initText } ref={ userTextContent } maxLength={ 100000 } ></textarea>
            </div>

            <Options />
        </section>
    )
}