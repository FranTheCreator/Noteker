import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { Options } from "./Options/Options.jsx"
import "./EditTask.css"

export const EditTask = () => {
    return (
        <section className="task-editing">
            <button className="task-editing__return">
                <FontAwesomeIcon icon={ faAngleLeft } /> Volver
            </button>
            <h1 className="task-editing__title">TITULO</h1>
            <div className="task-editing__content">
                <p className="task-editing__paragraph"></p>
            </div>

            <Options />
        </section>
    )
}