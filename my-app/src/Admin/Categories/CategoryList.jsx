import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";
import '../../dist/css/adminlte.min.css'
import '../../plugins/fontawesome-free/css/all.min.css'
import { Link } from "react-router-dom";
import { faEdit, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const CategoryList = () => {
    var stt = 0

    const [category, setCategory] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedCategory, setselectedCategory] = useState({});
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const handleShow = (id) => {
        setselectedCategory(category.find(a => a.id == id));
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleDelete = (id) => {
        setCategoryToDelete(id); 
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (confirmed) {
            AxiosClient.delete(`/Categories/${categoryToDelete}`)
                .then(() => {
                    setCategory(category.filter(category => category.id !== categoryToDelete));
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    }

    useEffect(() => {
        AxiosClient.get(`/Categories`)
            .then((res) => {
                setCategory(res.data);
            });
    }, []);

    return ( 
        <>
        <div>
            <Link to={`add`} className="btn btn-secondary m-2"><FontAwesomeIcon icon={faPlus} />Add Category</Link>

        </div>
            <Table>
                <thead className="table-dark">
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        category.map(item => {
                            return (
                                <tr>
                                    <td>{stt+=1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleShow(item.id)}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </Button>
                                        <Link to={`edit/${item.id}`} className="btn btn-secondary m-2"><FontAwesomeIcon icon={faEdit} /></Link>
                                        <Button variant="danger" onClick={() => handleDelete(item.id)} >Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <Modal show={show} size="sm" onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="4">
                            <dl>
                                <dt>Name</dt>
                                <dd>{selectedCategory.name}</dd>
                            </dl>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default CategoryList;