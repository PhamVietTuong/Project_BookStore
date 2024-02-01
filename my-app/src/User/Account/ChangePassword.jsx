import { Button, Card, Form, InputGroup } from "react-bootstrap";
import "./ChangePassword.css"
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = () => {
    const [changePassword, setChangePassword] = useState({
        Id: localStorage.getItem("userId")
    });
    const [error, setError] = useState('');
    const [wrongPasswordError, setWrongPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [inCorrectPassword, setInCorrectPassword] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);
    const navigate = useNavigate();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showAgainNewPassword, setShowAgainNewPassword] = useState(false);

    useEffect(() => {
        if (changePassword.password &&
            changePassword.newPassword &&
            changePassword.againNewPassword) {
            setBtnDisable(false)
        } else {
            setBtnDisable(true);
        }
    }, [changePassword.password, changePassword.newPassword, changePassword.againNewPassword]);

    const handleChangePassword = () => {
        if (changePassword.newPassword !== changePassword.againNewPassword) {
            setError("Mật khẩu chưa trùng khớp");
            return;
        }

        if (changePassword.newPassword.length < 8 ||
            changePassword.newPassword.length > 32 ||
            !/\d/.test(changePassword.newPassword) ||
            !/[a-zA-Z]/.test(changePassword.newPassword)) {
            setNewPasswordError(true)
            return;
        }

        try {
            AxiosClient.post(`/Users/changepassword`, changePassword).then((res) => {
                navigate("/")
            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                    if (error.response.data.error) {
                        setWrongPasswordError(error.response.data.error);
                    }
                }
            })
        }
        catch (e) { }


    }

    const handleOnchange = (e) => {
        setChangePassword((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleTogglePasswordVisibility = (field) => {
        switch (field) {
            case 'currentPassword': 
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case 'newPassword':
                setShowNewPassword(!showNewPassword);
                break;
            case 'againNewPassword':
                setShowAgainNewPassword(!showAgainNewPassword);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="geNdhL1">Đổi mật khẩu</div>
            <Card style={{ width: '70rem' }}>
                <div className="changePassword_Card">
                    <Card style={{ width: '30rem' }}>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <p>Mật khẩu hiện tại</p>
                                <div className="changePassword_FormControl">
                                    <Form.Control
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        placeholder="Nhập mật khẩu hiện tại"
                                        onChange={handleOnchange}
                                        name="password"
                                        aria-describedby="password"
                                        style={wrongPasswordError ? { borderColor: "rgb(255, 66, 79)" } : {}}
                                    />
                                    <div
                                        className="changePassword_iconEye"
                                        onClick={() => handleTogglePasswordVisibility('currentPassword')}
                                    >
                                        <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                                    </div>
                                </div>
                                <Form.Text id="newPassword" muted className={wrongPasswordError ? "errMessage" : ""}>
                                    {wrongPasswordError}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <p>Mật khẩu mới</p>
                                <div className="changePassword_FormControl">
                                    <Form.Control
                                        type={showNewPassword ? 'text' : 'password'}
                                        placeholder="Nhập mật khẩu mới"
                                        onChange={handleOnchange}
                                        name="newPassword"
                                        aria-describedby="newPassword"
                                        style={newPasswordError ? { borderColor: "rgb(255, 66, 79)" } : {}}
                                    />
                                    <div
                                        className="changePassword_iconEye"
                                        onClick={() => handleTogglePasswordVisibility('newPassword')}
                                    >
                                        <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                                    </div>
                                </div>
                                <Form.Text id="newPassword" muted className={newPasswordError ? "errMessage" : ""}>
                                    Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm chữ hoa, thường và số.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <p>Nhập lại mật khẩu mới</p>
                                <div className="changePassword_FormControl">
                                    <Form.Control
                                        type={showAgainNewPassword ? 'text' : 'password'}
                                        placeholder="Nhập lại mật khẩu mới"
                                        onChange={handleOnchange}
                                        name="againNewPassword"
                                        aria-describedby="againNewPassword"
                                        style={error ? { borderColor: "rgb(255, 66, 79)" } : {}}
                                    />
                                    <div
                                        className="changePassword_iconEye"
                                        onClick={() => handleTogglePasswordVisibility('againNewPassword')}
                                    >
                                        <FontAwesomeIcon icon={showAgainNewPassword ? faEyeSlash : faEye} />
                                    </div>
                                </div>
                                <Form.Text id="againNewPassword" muted className="errMessage">
                                    {error}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" className="changePassword_btn" onClick={handleChangePassword} disabled={btnDisable}>Lưu thay đổi</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Card>
        </>
    );
}

export default ChangePassword;