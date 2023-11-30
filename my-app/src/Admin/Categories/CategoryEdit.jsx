import { useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import '../../dist/css/adminlte.min.css'
import '../../plugins/fontawesome-free/css/all.min.css'

const CategoryEdit = () => {
    const { id } = useParams();

    const [category, setCategory] = useState({
        name: "",
        status: 1
    });

    const navigate = useNavigate();

    useEffect(() => {
        AxiosClient.get(`/Categories/${id}`)
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AxiosClient.put(`/Categories/${id}`, category)
            .then(() => {
                navigate(`/admin/category`);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    return ( 
        <>
            <Form className="col-md-4" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" name="name" onChange={handleChange} value={category.name} />
                </Form.Group>
                <div className="mt-2">
                    <Button type="submit" variant="success">Save</Button>
                </div>
            </Form>
        </>
     );
}
 
export default CategoryEdit;