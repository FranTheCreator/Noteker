import "./RemoveTask.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const RemoveTask =  ({ confirmRemoval }) => {
    return (
        <div className="main-container__task-remove" 
            title="Eliminar tarea"
            onClick={ confirmRemoval }
            >
            <FontAwesomeIcon icon={ faTrash }/>
        </div>  
    )
}