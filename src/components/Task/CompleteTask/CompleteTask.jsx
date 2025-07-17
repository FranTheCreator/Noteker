import "./CompleteTask.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

export const CompleteTask =  () => {
    return (
        <div className="main-container__task-check" title="Marcar tarea como completada">
            <FontAwesomeIcon icon={ faCheck } />
        </div>
    )
}