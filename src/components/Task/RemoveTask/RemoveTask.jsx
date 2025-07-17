import "./RemoveTask.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const RemoveTask =  ({}) => {
    return (
        <div className="main-container__task-remove" title="Eliminar tarea">
            <FontAwesomeIcon icon={ faTrash }/>
        </div>  
    )
}