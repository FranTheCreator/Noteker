import "./Task.css"
import { memo, useState } from "react"
import { RemoveTask } from "./RemoveTask/RemoveTask.jsx"
import { CompleteTask } from "./CompleteTask/CompleteTask.jsx"

export const Task =  memo( ({ taskTitle, taskText, openTask, showRemovalModal, initCompletionState = false, id, taskToRemove }) => {
    const [ completed, setCompleted ] = useState(initCompletionState);
    const isTaskCompleted = completed ? " task--completed" : "";
    const isTitleEmpty = taskTitle === "";


    const handleTaskCompletion = (event) => {
        const completionState = JSON.parse(localStorage.getItem("completedTasks"))
        completionState[id] = !completed;
        
        localStorage.setItem("completedTasks", JSON.stringify(completionState));
        event.stopPropagation();
        setCompleted(!completed);
    }

    const handleRemovalConfirmation = (event) => {
        taskToRemove.current = id;
        event.stopPropagation();
        showRemovalModal();
    }


    taskTitle = taskTitle.trim();
    taskText = taskText.trim();
    taskText = taskText.substring(0, 50);

    if (taskTitle.includes(" ")) {
        taskTitle = taskTitle.split(" ");
        taskTitle = `${taskTitle[0]} ${taskTitle[1]}`
    }


    return (
        <div className={`task${ isTaskCompleted }`}
            title={ completed ? "Tarea completada" : undefined }
            onClick={ openTask }
        >
            <RemoveTask confirmRemoval={ handleRemovalConfirmation } />
            <h2 className="task__title" title={ isTitleEmpty ? taskText : taskTitle } >
                { isTitleEmpty ? taskText : taskTitle }
            </h2>
            <CompleteTask taskState={ completed } setTaskState={ handleTaskCompletion }/>
        </div>
    )
})