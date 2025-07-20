import "./Task.css"
import { RemoveTask } from "./RemoveTask/RemoveTask.jsx"
import { CompleteTask } from "./CompleteTask/CompleteTask.jsx"
import { memo, useState } from "react"

export const Task =  memo( ({ taskTitle, openTask, removalConfirmation, id, removerId }) => {
    const [ completed, setCompleted ] = useState(false);

    const handleTaskCompletion = (event) => {
        event.stopPropagation();
        setCompleted(!completed);
    }
    
    const handleRemovalConfirmation = (event) => {
        event.stopPropagation();
        removalConfirmation();
    }

    removerId.current = id;
    

    return (
        <div className={`main-container__task ${completed ? "task--completed" : ""}`}
            title={ completed ? "Tarea completada" : "" }
            onClick={ openTask }
        >
            <RemoveTask confirmRemoval={ handleRemovalConfirmation } />
            <h2>{ taskTitle }</h2>
            <CompleteTask taskState={ completed } setTaskState={ handleTaskCompletion }/>
        </div>
    )
})