import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AxiosClient from "../../Axios/AxiosClient"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AccountList = () => {
    const [users, setUsers] = useState([]);
    var i = 1;
    const [show, setShow] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState({});
    const handleShow = (id) => {
        setSelectedUsers(users.find(u => u.id === id));
        setShow(true);

    }
    const handleClose = () => setShow(false);

    useEffect(() => {
        AxiosClient.get(`/Users`)
            .then((res) => {
                setUsers(res.data);
            });
    }, []);
    return (
        <>
            <div>
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Danh sách loại tài khoản</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Library</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <Link to={"/admin/accounts/add"} className="btn btn-success mb-2"><FontAwesomeIcon icon={faPlus} /> Tạo  tài khoản</Link>
                                    <div className="table-responsive">
                                        <table id="myTable" className="table table-striped table-bordered display nowrap" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.map(item => {
                                                        return (
                                                            <tr>
                                                                <td>{i++}</td>
                                                                <td>{item.userName}</td>
                                                                <td>{item.email}</td>
                                                                <td>
                                                                    <td>
                                                                        <Button variant="info" onClick={() => handleShow(item.id)} className="ml-2">
                                                                            <FontAwesomeIcon icon={faUser} />
                                                                        </Button>

                                                                        <Link to={`edit/${item.id}`} className="btn btn-warning ml-2">
                                                                            <FontAwesomeIcon icon={faEdit} />
                                                                        </Link>
                                                                        <Button variant="danger ml-2">
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </Button>
                                                                    </td>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </tfoot>
                                        </table>

                                        <Modal show={show} size="lg" onHide={handleClose} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Thông tin tài khoản</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                <Row>
                                                    <Col md={4}>
                                                        <dl>
                                                            <dt>Tên đăng nhập:</dt>
                                                            <dd>{selectedUsers.userName}</dd>

                                                            <dt>Email:</dt>
                                                            <dd>{selectedUsers.email}</dd>
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

                                        {/* <Modal show={showDelete} onHide={handleCloseDelete} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Xác nhận xóa</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Bạn có chắc muốn xóa loại sản phẩm <span style={{ fontWeight: "bold" }}>{selectedCategory.name}</span> ?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="danger" onClick={handleDelete}>
                                                    <FontAwesomeIcon icon={faCheck} /> Đồng ý
                                                </Button>
                                                <Button variant="secondary" onClick={handleCloseDelete}>
                                                    <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
                                                </Button>
                                            </Modal.Footer>
                                        </Modal> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AccountList;