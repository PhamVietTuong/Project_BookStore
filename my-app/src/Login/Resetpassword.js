import React, { useState } from 'react';
import AxiosClient from '../Axios/AxiosClient';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';


function ResetPasswordForm() {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        console.log(username);
        try {
            const response = await AxiosClient.get(`/Users/reset-password-token`, {
                params: {
                    Username: username,
                }
            });
            const token = response.data.token;
            setToken(token);
            setMessage('Token generated successfully. Please proceed to reset your password.');
        } catch (error) {
            setMessage('Failed to generate token. Please check your username and try again.');
        }
    };

    const handleResetPasswordSubmit = async () => {
        try {
            const response = await AxiosClient.post(`/Users/reset-password-user`, {
                username: username,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
                token: token
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to reset password. Please try again later.');
        }
    };

    return (
        <Row className='d-flex justify-content-center align-items-center h-100'>
            <Col col='12'>
                <Card.Body className='p-5 w-100 d-flex flex-column'>
                    <h2 className="text-center fw-bold mb-5">Reset Password</h2>

                    <Form.Group className='mb-4 w-100'>
                        <Form.Control
                            placeholder='Username'
                            type='username'
                            size="lg"
                            name="username"
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-4 w-100'>
                        <Form.Control
                            placeholder='Password'
                            type='password'
                            size="lg"
                            name="password"
                            onChange={(e)=>setNewPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-4 w-100'>
                        <Form.Control
                            placeholder='New Password'
                            type='password'
                            size="lg"
                            name="newPassword"
                            onChange={(e)=>setNewPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-4 w-100'>
                        <Form.Control
                            placeholder='Confirm Password'
                            type='password'
                            size="lg"
                            name="confirmPassword"
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button size='lg 'style={{  marginBottom: '5px', background:'Green' }} onClick={handleResetPassword}>
                        Generate Token
                    </Button>

                    <Button size='lg' onClick={handleResetPasswordSubmit}>
                        Reset Password
                    </Button>
                    <p className="message" style={{marginTop:'5px', color:'red'}}>{message}</p>

                </Card.Body>
            </Col>
        </Row>

    );
}

export default ResetPasswordForm;
