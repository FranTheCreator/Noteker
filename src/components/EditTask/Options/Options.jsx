import "./Options.css"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faClock, faEllipsisVertical, faEye, faPen } from "@fortawesome/free-solid-svg-icons"

export const Options = ({ viewMode, setViewMode }) => {
    const [ showOptions, setShowOptions ] = useState(false);

    const viewModeTitle = viewMode ? "Editar tarea" : "Solo lectura"
    const isMenuClosed = showOptions ? "Cerrar menú" : "Abrir menú";
    const isDeployed = showOptions ? " options--deployed" : "";


    return (
        <div className={ `task-editing__options${ isDeployed }` }>
            <button className="task-editing__deploy" 
                onClick={ () => setShowOptions(!showOptions) }
                title={ isMenuClosed }
            >
                <FontAwesomeIcon icon={ showOptions ? faAngleRight : faEllipsisVertical } />
            </button>
            {
                showOptions && 
                <ul className="task-editing__menu">
                    <li title={ viewModeTitle }>
                        <button className="task-editing__button" onClick={ setViewMode }>
                            <FontAwesomeIcon icon={ viewMode ? faPen : faEye } />
                        </button>
                    </li>
                    <li title="Poner recordatorio">
                        <button className="task-editing__button">
                            <FontAwesomeIcon icon={ faClock } />
                        </button>
                    </li>
                </ul>
            }
        </div>
    )
}