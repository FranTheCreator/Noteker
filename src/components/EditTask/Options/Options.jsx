import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import "./Options.css"

export const Options = () => {
    return (
        <button className="task-editing__options">
            <FontAwesomeIcon icon={ faEllipsisVertical } />
        </button>
    )
}