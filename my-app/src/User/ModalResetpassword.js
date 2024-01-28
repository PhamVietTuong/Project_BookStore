import { Modal } from "react-bootstrap";
import ResetPasswordForm from "../Login/Resetpassword";

const ModalResetpassword = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Body>
                    <button type="button" className="close" onClick={handleClose}>
                        <i className="fas fa-times header_iconClose" />
                    </button>
                    <ResetPasswordForm onSuccess={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalResetpassword;