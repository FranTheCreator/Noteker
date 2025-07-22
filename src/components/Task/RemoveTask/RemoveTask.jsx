import "./RemoveTask.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const RemoveTask =  ({ confirmRemoval, disableTabIndex }) => {
    return (
        <button className="main-container__task-remove" 
            title="Eliminar tarea"
            onClick={ confirmRemoval }
            onKeyDown={ (event) => event.stopPropagation()}
            tabIndex={ disableTabIndex ? -1 : undefined }
            >
            <FontAwesomeIcon icon={ faTrash }/>
        </button>  
    )
}