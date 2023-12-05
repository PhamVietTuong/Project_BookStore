import { useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
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
            <div className="card">
                <Form className="col-md-4" onSubmit={handleSubmit}>
                    <div className="card-body">
                        <h4 class="card-title">Thông tin loại sản phẩm</h4>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="text-right control-label col-form-label">Tên</Form.Label>
                            <Col sm={9}>
                                <Form.Control placeholder="Name" type="text" name="name" onChange={handleChange} value={category.name} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class="border-top">
                        <div className="mt-2 card-body">
                            <button type="submit" class="btn btn-primary">Sửa</button>
                        </div>
                    </div>

                </Form>
            </div>
        </>
     );
}
 
export default CategoryEdit;