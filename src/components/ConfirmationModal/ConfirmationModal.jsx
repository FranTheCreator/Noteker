import "./ConfirmationModal.css"

export const ConfirmationModal = ({ closeModal, confirm }) => {
    return (
        <dialog className="confirmation-modal">
            <div className="confirmation-modal__body" tabIndex={ 0 }>
                <p>¿Seguro que quieres eliminar esta tarea?</p>
                <ul className="confirmation-modal__options">
                    <li>
                        <button className="confirmation-modal__button button--cancel" 
                                onClick={ closeModal }>
                            Cancelar
                        </button>
                    </li>
                    <li>
                        <button className="confirmation-modal__button button--delete" onClick={ confirm } >
                            Eliminar
                        </button>
                    </li>
                </ul>
            </div>
        </dialog>
    )
}