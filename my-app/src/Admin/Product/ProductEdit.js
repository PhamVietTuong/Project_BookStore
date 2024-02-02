import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Form, FormControl } from "react-bootstrap";

const ProductEdit = () => {
  const { id } = useParams();
  
  const [Products, setProducts] = useState({
    star: 5,
    status: true,
    author: {},
    category: {},
    publisher: {},
    promotion: {},

  });

  useEffect(() => {
    AxiosClient.get(`/Books/${id}`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  const [Categories, setCategories] = useState([]);
  const [Authors, setAuthors] = useState([]);
  const [Publishers, setPublishers] = useState([]);
  const [Promotion, setPromotion] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProducts((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AxiosClient.put(`/Books/${id}`, Products).then(() => {
      navigate("/admin/products");
    });
  };

  useEffect(() => {
    AxiosClient.get(`/Categories`).then((res) => {
      setCategories(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Authors`).then((res) => {
      setAuthors(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Publishers`).then((res) => {
      setPublishers(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Promotions`).then((res) => {
      setPromotion(res.data);
    });
  }, []);

  var widthInput = {
    width: "70%",
  };

  var content = {
    display: "flex",
  };
  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header" style={{display:"flex",  justifyContent : "space-between"}}>
                  <h3 className="card-title">Sửa Sản Phẩm</h3>
                  <Link to='/admin/products' className="btn btn-primary" style={{width:"10rem"}}>Quay lại</Link>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <Form onSubmit={handleSubmit}>
                  <div className="card-body" style={content}>
                    <div style={{ width: "50%" }}>
                      <Form.Group>
                        <Form.Label>Tên sách:</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          onChange={handleChange}
                          placeholder="Nhập tên"
                          value={Products.name}
                          style={widthInput}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Giá:</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          style={widthInput}
                          placeholder="Nhập giá"
                          value={Products.price}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Số lượng:</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantity"
                          style={widthInput}
                          placeholder="Nhập số lượng"
                          value={Products.quantity}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Tác giả</Form.Label>
                        <Form.Select
                          onChange={handleChange}
                          name="authorId"
                          style={widthInput}
                        >
                          <option value={Products.authorId}>{Products.author.name}</option>
                          {Authors.map((item) => {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Thể loại:</Form.Label>
                        <Form.Select
                          onChange={handleChange}
                          name="categoryId"
                          style={widthInput}
                        >
                          <option value={Products.categoryId}>{Products.category.name}</option>
                          {Categories.map((item) => {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Nhà xuất bản:</Form.Label>
                        <Form.Select
                          onChange={handleChange}
                          name="publisherId"
                          style={widthInput}
                        >
                          <option value={Products.publisherId}>{Products.publisher.name}</option>
                          {Publishers.map((item) => {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Khuyến mãi:</Form.Label>
                        <Form.Select
                          onChange={handleChange}
                          name="promotionId"
                          style={widthInput}
                        >
                          <option value={Products.promotionId}>{Products.promotion.promotionPercentage}</option>
                          {Promotion.map((item) => {
                            return (
                              <option value={item.id}>
                                {item.promotionPercentage}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="description"
                          onChange={handleChange}
                          style={{width:"100%"}}
                          placeholder="Mô tả"
                          value={Products.description}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <Button type="submit" variant="btn  btn-success">
                      Sửa thông tin sản phẩm
                    </Button>
                    <Link to='/admin/products' className="btn btn-primary" style={{width:"10rem", marginLeft:"1rem"}}>Quay lại</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductEdit;
