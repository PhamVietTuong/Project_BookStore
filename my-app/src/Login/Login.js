import { useState } from "react";
import { Form, Toast, Button } from "react-bootstrap";
import AxiosClient from "../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [account, setAccount] = useState({});
    const [errors, setErrors] = useState({}); 

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAccount(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }

    const validate = () => {
        const newErrors = {};

        if (!account.username) {
            newErrors.username = "Please enter username";
        }

        if (!account.password) {
            newErrors.password = "Please enter password";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()) {
            AxiosClient.post(`/Users/login`, account)
                .then(res => {
                    localStorage.setItem("jwt", res.data.token);

                    navigate("/login/dashboard");
                })
                .catch((error) => {
                    console.error("Error during login:", error);
                    setErrors({ general: "Error during login. Please try again." });
                });
        }
    }
    
    return (
        <>
            <Form className="col-md-3">
                <Form.Group className="mb-3">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" name="username" onChange={handleChange} />
                </Form.Group>
                {errors.username && (
                    <Toast show={!!errors.username} onClose={() => setErrors((prev) => ({ ...prev, username: null }))} bg="danger" text="white" delay={3000} autohide>
                        <Toast.Body>{errors.username}</Toast.Body>
                    </Toast>
                )}
                <Form.Group className="mb-3">
                    <Form.Label>Pass word</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} />
                </Form.Group>
                {errors.password && (
                    <Toast show={!!errors.password} onClose={() => setErrors((prev) => ({ ...prev, password: null }))} bg="danger" text="white" delay={3000} autohide>
                        <Toast.Body>{errors.password}</Toast.Body>
                    </Toast>
                )}
                <Button variant="success" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Login
                </Button>
            </Form>
        </>
    );
}

export default Login