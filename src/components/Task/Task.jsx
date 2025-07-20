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
        removerId.current = id;
        event.stopPropagation();
        console.log("task id: " + id)
        console.log("remover obj (useRef): " + removerId.current)
        removalConfirmation();
    }
    

    taskTitle = taskTitle.trim();

    if (taskTitle.includes(" ")){
        taskTitle = taskTitle.split(" ");
        taskTitle = `${taskTitle[0]} ${taskTitle[1]}`
    }


    return (
        <div className={`task ${completed ? "task--completed" : ""}`}
            title={ completed ? "Tarea completada" : "" }
            onClick={ openTask }
        >
            <RemoveTask confirmRemoval={ handleRemovalConfirmation } />
            <h2 className="task__title">{ taskTitle }</h2>
            <CompleteTask taskState={ completed } setTaskState={ handleTaskCompletion }/>
        </div>
    )
})