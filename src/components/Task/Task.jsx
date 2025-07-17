import "./Task.css"
import { RemoveTask } from "./RemoveTask/RemoveTask.jsx"
import { CompleteTask } from "./CompleteTask/CompleteTask.jsx"

export const Task =  () => {
    return (
        <div className="main-container__task">
            <RemoveTask />
            <CompleteTask />
        </div>
    )
}