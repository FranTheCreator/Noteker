import "./CompleteTask.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons"

export const CompleteTask =  ({ taskState, setTaskState }) => {
    return (
        <div className={ `main-container__task-check ${taskState ? "task-check--uncomplete" : ""}` }
            title= { taskState ? "Marcar tarea como no completada" : "Marcar tarea como completada" }
            onClick={ setTaskState }
            >
            { taskState ? <FontAwesomeIcon icon={ faMinus }/> : <FontAwesomeIcon icon={ faCheck } /> }
        </div>
    )
}