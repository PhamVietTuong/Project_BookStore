import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ProductAdd = () => {
  const [Products, setProducts] = useState({
    star: 5,
    quantitySold: 0,
    status: true,
  });

  const [Categories, setCategories] = useState([]);
  const [Authors, setAuthors] = useState([]);
  const [Publishers, setPublishers] = useState([]);
  const [Promotion, setPromotion] = useState([]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  // const accessToken = localStorage.getItem('userId');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("fileName", file.name);
    formData.append("fileImage", file);
    formData.append("filePDF", null);
    formData.append("booId", "");
    AxiosClient.post(`/Images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      window.location.reload();
    });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProducts((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;
    setProducts((prev) => ({ ...prev, [name]: checked }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    AxiosClient.post(`/Books`, Products).then(() => {
      navigate("/admin/products");
    });
  };

  useEffect(() => {
    AxiosClient.get(`/Categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Authors`).then((res) => {
      setAuthors(res.data);
    });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Publishers`).then((res) => {
      setPublishers(res.data);
    });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Promotions`).then((res) => {
      setPromotion(res.data);
    });
  }, []);

  var widthInput = {
    width: "100%",
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
                <div className="card-header" style={{display:"flex", justifyContent:"space-between"}}>
                  <h3 className="card-title">Thêm Sản Phẩm</h3>
                  <Link to='/admin/products' className="btn btn-primary" style={{width:"10rem"}}>Quay lại</Link>               
                </div>
                {/* /.card-header */}
                {/* form start */}
                <Form onSubmit={handleSubmit}>
                  <div className="card-body" style={content}>
                    <div style={{ width: "30%" }}>
                      <Form.Group>
                        <Form.Label>Tên sách:</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          onChange={handleChange}
                          style={widthInput}
                          placeholder="Nhập tên"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Giá:</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          onChange={handleChange}
                          style={widthInput}
                          placeholder="Nhập giá"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Số lượng:</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantity"
                          onChange={handleChange}
                          style={widthInput}
                          placeholder="Nhập số lượng"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Tác giả</Form.Label>
                        <Form.Select
                          onChange={handleChange}
                          name="authorId"
                          style={widthInput}
                        >
                          <option value="">-- Chọn --</option>
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
                          <option value="">-- Chọn --</option>
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
                          <option value="">-- Chọn --</option>
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
                          <option value="">-- Chọn --</option>
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
                          style={widthInput}
                          placeholder="Mô tả"
                        />
                      </Form.Group>
                    </div>
                    <div style={{ width: "70%" }}>          
                      <div style={{ width: "60%", margin:"0 auto", paddingTop:"7rem" }}>
                        <img style={{width:"60%"}}
                        src="https://localhost:7106/Images/TrenDuongBang.png"
                        
                      /></div>
                    </div>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <Button type="submit" variant="btn btn-success" style={{width:"10rem"}}>
                      Thêm
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div style={{ marginTop: "3rem", width: "50%" }}>
                    <form encType="multipart/form-data">
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                      />
                      <div className="card card-hover" style={{ width: "40%" }}>
                        <div className="box text-center">
                          <h1 className="font-light text-black">
                            <label style={{ marginRight: "0.5rem" }}>
                              Thêm ảnh
                            </label>
                            <FontAwesomeIcon icon={faPlus} />
                          </h1>
                        </div>
                      </div>

                     
                    </form>
                  </div> */}
    </>
  );
};

export default ProductAdd;
