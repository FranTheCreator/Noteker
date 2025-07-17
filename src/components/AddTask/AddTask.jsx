import "./Addtask.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export const AddTask = ({ onclick }) => {
    return (
        <div 
            className="main-container__add-task" 
            title="Agregar tarea nueva"
            onClick={ onclick }
            >
            <span className="main-container__add-task-dot">
                <FontAwesomeIcon icon={ faPlus } />
            </span>
        </div>
    )
}