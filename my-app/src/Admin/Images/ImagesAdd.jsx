import { createRef, useEffect, useRef, useState } from "react";
import $ from 'jquery';
import AxiosClient from "../../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const ImagesAdd = () => {

    var id = 0;
    const [selectedProduct, setselectedProduct] = useState({
      author: {},
      category: {},
      publisher: {},
      price:{}
    });
    const [Products, setProducts] = useState([]);

    const [dataLoaded, setDataLoaded] = useState(false);
  
    const handleFileSelect = (e, idBook) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("fileName", file.name);
      formData.append("fileImage", file);
      formData.append("filePDF", null);
      formData.append("bookId",idBook );
      AxiosClient.post(`/Images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        window.location.reload();
      })
      .catch((error) => {
        // Handle error here
        console.error("Error uploading file:", error);
      });
    };

    useEffect(() => {
      AxiosClient.get(`/Books`).then((res) => {
        setProducts(res.data);
        setDataLoaded(true);
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
              <h4 className="page-title">Thêm Ảnh</h4>
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
                        {Products.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{(id += 1)}</td>
                              <td>{item.id}</td>
                              <td>{item.author.name}</td>
                              <td>{item.category.name}</td>
                              <td>{item.publisher.name}</td>
                              <td>{item.price.toLocaleString("en-US").replace(/,/g, ".")} ₫</td>
                              <td>
                        
                                <form encType="multipart/form-data">
                                  <input
                                    type="file"                                                                  
                                    onChange={(e) => handleFileSelect(e, item.id)}
                                  />
                                 
                                </form>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </> );
}
 
export default ImagesAdd;