import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Form } from "react-bootstrap";

const ProductAdd = () => {
  const [Products, setProducts] = useState({
    favourite: true,
    star: 4,
    status: true,
  });

  const [Categories, setCategories] = useState([]);
  const [Authors, setAuthors] = useState([]);
  const [Publishers, setPublishers] = useState([]);

  const navigate = useNavigate();

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

  var widthInput = {
    width: "70%"
  }

  var content = {
    display: "flex"
  }

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Thêm Sản Phẩm</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <Form onSubmit={handleSubmit}>
                <div className="card-body" style={content}>
                    <div style={{width:"50%"}}>
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
                    <div style={{width:"50%"}}>
                      <Form.Group className="mb-3">
                        <Form.Label>Chọn tệp tin:</Form.Label>
                        <Form.Control type="file" style={widthInput}/>
                      </Form.Group>
                      <img src="https://localhost:7106/Images/TrenDuongBang.png" style={{width: "70%"}}/>
                    </div>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <Button type="submit" variant="btn btn-primary">
                      Thêm
                    </Button>
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

export default ProductAdd;
