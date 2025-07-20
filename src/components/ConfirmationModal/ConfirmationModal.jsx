import "./ConfirmationModal.css"

export const ConfirmationModal = ({ closeModal, confirm }) => {
    return (
        <dialog className="confirmation-modal" open>
            <form method="dialog" className="confirmation-modal__body">
                <p>¿Seguro que quieres eliminar esta tarea?</p>
                <menu className="confirmation-modal__options">
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
                </menu>
            </form>
        </dialog>
    )
}