import "./Addtask.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export const AddTask = ({ openEditor, disableTabIndex }) => {
    return (
        <button className="add-task" title="Agregar tarea nueva" onClick={ openEditor } tabIndex={ disableTabIndex ? -1 : 1 }>
            <FontAwesomeIcon icon={ faPlus } />
        </button>
    )
}