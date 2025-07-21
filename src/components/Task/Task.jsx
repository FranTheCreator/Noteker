import "./Task.css"
import { RemoveTask } from "./RemoveTask/RemoveTask.jsx"
import { CompleteTask } from "./CompleteTask/CompleteTask.jsx"
import { memo, useState } from "react"

export const Task =  memo( ({ taskTitle, taskText, openTask, removalConfirmation, id, removerId }) => {
    const [ completed, setCompleted ] = useState(false);
    const titleIsEmpty = taskTitle === "";

    const handleTaskCompletion = (event) => {
        event.stopPropagation();
        setCompleted(!completed);
    }

    const handleRemovalConfirmation = (event) => {
        removerId.current = id;
        event.stopPropagation();
        removalConfirmation();
    }


    taskTitle = taskTitle.trim();
    taskText = taskText.trim();
    taskText = taskText.substring(0, 50);

    if (taskTitle.includes(" ")) {
        taskTitle = taskTitle.split(" ");
        taskTitle = `${taskTitle[0]} ${taskTitle[1]}`
    }


    return (
        <div className={`task ${ completed ? "task--completed" : "" }`}
            title={ completed ? "Tarea completada" : "" }
            onClick={ openTask }
        >
            <RemoveTask confirmRemoval={ handleRemovalConfirmation } />
            <h2 className="task__title" title={ titleIsEmpty ? taskText : taskTitle } >
                { titleIsEmpty ? taskText : taskTitle }
            </h2>
            <CompleteTask taskState={ completed } setTaskState={ handleTaskCompletion }/>
        </div>
    )
})