import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";

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
            <div className="card">
                <Form className="col-md-4" onSubmit={handleSubmit}>
                    <div className="card-body">
                        <h4 class="card-title">Tạo loại sản phẩm</h4>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="text-right control-label col-form-label">Tên</Form.Label>
                            <Col sm={9}>
                                <Form.Control placeholder="Name" type="text" name="name" onChange={handleChange}/>
                            </Col>
                        </Form.Group>
                    </div>
                    <div class="border-top">
                        <div className="mt-2 card-body">
                            <button type="submit" class="btn btn-primary">Tạo</button>
                        </div>
                    </div>

                </Form>
            </div>
        </>
    );
}

export default CategoryCreate;