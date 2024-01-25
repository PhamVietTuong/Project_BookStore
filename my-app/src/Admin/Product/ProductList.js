import {
  faBook,
  faCheck,
  faEdit,
  faInfoCircle,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import $ from 'jquery';

const ProductList = () => {
  var id = 0;
  const [Products, setProducts] = useState([]);
  const [Images, setImages] = useState([]);
  const [show, setshow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedImage, setselectedImage] = useState({});
  const [selectedProduct, setselectedProduct] = useState({
    author: {},
    category: {},
    publisher: {},
    price:{}
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  const handleShow = (id) => {
    setselectedProduct(Products.find((a) => a.id === id));
    setselectedImage(Images.find((a) => a.bookId === id));
    setshow(true);
  }
  const handleClose = () => setshow(false);
  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (id) => {
    setselectedProduct(Products.find((a) => a.id === id));
    setShowDelete(true);
  };
  const handleDelete = () => {
    AxiosClient.delete(`/Books/${selectedProduct.id}`);
    let list = Products;
    list.splice(
      Products.findIndex((a) => a.id === selectedProduct.id),
      1
    );
    setProducts(list);
    setShowDelete(false);
  };
  useEffect(() => {
    AxiosClient.get(`/Books`).then((res) => {
      setProducts(res.data);
      setDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Images`).then((res) => {
      setImages(res.data);
    });
  }, []);

  useEffect(() => {
    if (dataLoaded) {
        $('#myTable').DataTable({
            dom: 'Bfrtip',
            responsive: true,
            autoWidth: false,
            buttons: [
                {
                    extend: 'copy',
                    className: 'btn bg-primary',
                },
                {
                    extend: 'csv',
                    className: 'btn bg-secondary',
                },
                {
                    extend: 'excel',
                    className: 'btn bg-success',
                    filename: function () {
                        return 'data_' + Date.now();
                    }
                },
                {
                    extend: 'pdf',
                    className: 'btn bg-danger',
                    filename: function () {
                        return 'data_' + Date.now();
                    }
                }
            ],
            "bDestroy": true
        });
    }
}, [dataLoaded]);

  return (
    <>
      <div>
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">Danh sách sản phẩm</h4>
              <div className="ml-auto text-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Library
                    </li>
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
                  <Link to={`add`} className="btn btn-secondary mb-2">
                    <FontAwesomeIcon icon={faPlus} /> Tạo sản phẩm
                  </Link>
                  <div className="table-responsive">
                    <table
                      id="myTable"
                      className="table table-striped table-bordered display nowrap"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên</th>
                          <th>Tác giả</th>
                          <th>Thể loại</th>
                          <th>Nhà xuất bản</th>
                          <th>Giá bán</th>
                          <th>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Products.map((item) => {
                          return (
                            <tr>
                              <td>{(id += 1)}</td>
                              <td>{item.name}</td>
                              <td>{item.author.name}</td>
                              <td>{item.category.name}</td>
                              <td>{item.publisher.name}</td>
                              <td>{item.price.toLocaleString("en-US").replace(/,/g, ".")} ₫</td>
                              <td>
                                <Button
                                  variant="primary"
                                  onClick={() => handleShow(item.id)}
                                >
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                </Button>
                                <Link
                                  to={`edit/${item.id}`}
                                  className="btn btn-secondary m-2"
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <Button
                                  variant="danger"
                                  onClick={() => handleShowDelete(item.id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>STT</th>
                          <th>Tên</th>
                          <th>Tác giả</th>
                          <th>Thể loại</th>
                          <th>Nhà xuất bản</th>
                          <th>Giá bán</th>
                          <th>Chức năng</th>
                        </tr>
                      </tfoot>
                    </table>

                    <Modal show={show} size="lg" onHide={handleClose} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Thông tin sản phẩm</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col md={6}>
                            <img
                              src={`https://localhost:7106/Images/${selectedImage.fileName}`}
                              style={{ width: "400px" }}
                            />
                          </Col>
                          <Col md={4} style={{width:"47.333333%"}}>
                            <dl className="row">
                              <dt>Tên </dt>
                              <dd>{selectedProduct.name}</dd>
                              <dt>Tác giả </dt>
                              <dd>{selectedProduct.author.name}</dd>
                              <dt>Thể loại </dt>
                              <dd>{selectedProduct.category.name}</dd>
                              <dt>Nhà xuất bản </dt>
                              <dd>{selectedProduct.publisher.name}</dd>
                              <dt>Giá </dt>
                              <dd>{selectedProduct.price.toLocaleString("en-US").replace(/,/g, ".")} ₫</dd>
                            </dl>
                          </Col>                        
                        </Row>
                        <Row>
                          <Col md={12}>
                              <dl className="row">                       
                                <dt>Mô tả </dt>
                                <dd className="text-justify">{selectedProduct.description}</dd>
                              </dl>
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Đóng
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <Modal
                      show={showDelete}
                      onHide={handleCloseDelete}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Xác nhận xóa</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Bạn có chắc muốn sản phẩm{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {selectedProduct.name}
                        </span>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={handleDelete}>
                          <FontAwesomeIcon icon={faCheck} /> Đồng ý
                        </Button>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                          <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
