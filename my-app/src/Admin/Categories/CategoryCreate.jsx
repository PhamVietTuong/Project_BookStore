import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import '../../dist/css/adminlte.min.css'
import '../../plugins/fontawesome-free/css/all.min.css'

const CategoryCreate = () => {
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        name: "",
        status: 1
    });

    const handleChange = (e) => {
        setCategory(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AxiosClient.post(`/Categories`, category)
            .then(() => {
                navigate("/admin/category");
            });
    }

    return ( 
        <>
            <Form className="col-md-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" name="name" onChange={handleChange} value={category.name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Status:</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="status"
                        label="Active"
                        checked={category.status}
                        onChange={(e) => setCategory({ ...category, status: e.target.checked })}
                    />
                </Form.Group>
                <div className="mt-2">
                    <Button type="submit" variant="success">Create</Button>
                </div>
            </Form>
        </>
     );
}
 
export default CategoryCreate;