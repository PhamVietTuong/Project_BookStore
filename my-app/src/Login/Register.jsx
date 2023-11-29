import { useState, React } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Card, Container, Form, InputGroup} from 'react-bootstrap';
import AxiosClient from '../Axios/AxiosClient';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [account, setAccount] = useState({
        userName: "",
        email: "",
        passWord: "",
        fullName:""
    });

    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAccount(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AxiosClient.post('/Users/register', account);
            if (response.status === 200) {
                navigate('/dashboard');
            } else {
                console.error('Registration failed:', response.data);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <Container fluid className='d-flex align-items-center justify-content-center bg-image'>
            <div className='mask gradient-custom-3'></div>
            <Card className='m-4' style={{ maxWidth: '500px' }}>
                <Card.Body className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-4'>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control size='lg' type='text' name="userName" onChange={handleChange} value={account.userName} />
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control size='lg' type='text' onChange={handleChange} name="fullName" value={account.fullName} />
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control size='lg' type='email' name="email" onChange={handleChange} value={account.email} />
                        </Form.Group>
                        <Form.Group className='mb-4'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control size='lg' type='password' name="passWord" onChange={handleChange} value={account.passWord} />
                        </Form.Group>
                        {/* <Form.Group className='mb-4'>
                            <InputGroup className='d-flex flex-row'>
                                <InputGroup.Checkbox id='flexCheckDefault' label='I agree all statements in Terms of service' />
                            </InputGroup>
                        </Form.Group> */}
                        <Button className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Register