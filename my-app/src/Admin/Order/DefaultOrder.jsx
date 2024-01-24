import { Link } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";

const DefaultOrder = ({ ListOfInvoice }) => {
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [Orderer, setOrderer] = useState({});

  const handleLinkClick = (rowIndex) => {
    setOpenRowIndex((prevIndex) => (prevIndex === rowIndex ? null : rowIndex));
  };

  const handleConfirmClick = () => {
    setOpenRowIndex(null);
  };

  const handleLinkClick1 = (idinvoice) => {
    AxiosClient.get(`InvoiceDetails/detailsOfAnOrder/${idinvoice}`).then(
      (res) => {
        setOrderDetails(res.data);
      }
    );
  };

  const handleLinkClickOrderer = (idinvoice) => {
    AxiosClient.get(`InvoiceDetails/orderer/${idinvoice}`).then((res) => {
      setOrderer(res.data);
    });
  };

  const myStylesApprove = {
    backgroundColor: "#fcfca1",
    border: "1px solid #ccc",
    width: "35%",
    borderRadius: "4px",
    textAlign: "center",
  };

  const myStylesConfirm = {
    backgroundColor: "rgb(197 255 217)",
    border: "1px solid #ccc",
    width: "40%",
    borderRadius: "4px",
    textAlign: "center",
  };

  const myStylesTransfer = {
    backgroundColor: "rgb(145 197 254)",
    border: "1px solid #ccc",
    width: "50%",
    borderRadius: "4px",
    textAlign: "center",
  };

  const myStylesDeliver = {
    backgroundColor: "rgb(197 255 217)",
    border: "1px solid #ccc",
    width: "35%",
    borderRadius: "4px",
    textAlign: "center",
  };

  const myStylesCancel = {
    backgroundColor: "#f97474",
    border: "1px solid #ccc",
    width: "35%",
    borderRadius: "4px",
    textAlign: "center",
  };
  
  const getStyles = (orderStatus) => {
    switch (orderStatus) {
      case "Đã đặt":
        return {
          backgroundColor: "#fcfca1",
          border: "1px solid #ccc",
          width: "40%",
          borderRadius: "4px",
          textAlign: "center",
        };
      case "Đã xác nhận":
        return {
          backgroundColor: "rgb(197 255 217)",
          border: "1px solid #ccc",
          width: "40%",
          borderRadius: "4px",
          textAlign: "center",
        };
      case "Đang vận chuyển":
        return {
          backgroundColor: "rgb(145 197 254)",
          border: "1px solid #ccc",
          width: "40%",
          borderRadius: "4px",
          textAlign: "center",
        };
      case "Đã giao":
        return {
          backgroundColor: "rgb(197 255 217)",
          border: "1px solid #ccc",
          width: "40%",
          borderRadius: "4px",
          textAlign: "center",
        };
      case "Đã hủy":
        return {
          backgroundColor: "#f97474",
          border: "1px solid #ccc",
          width: "40%",
          borderRadius: "4px",
          textAlign: "center",
        };
      default:
        return null;
    }
  };

  return (
    <>
      <div class="container mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>
                Mã đơn hàng/ Ngày đặt hàng
              </th>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>
                Trạng thái
              </th>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>
                Số lượng/ GTĐH
              </th>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {ListOfInvoice.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    {/* <td style={{width: "2%", textAlign:"center", paddingTop:"1.5rem"}} >v</td> */}
                    <td>
                      <div>
                        <p style={{ color: "#2962FF" }}>{item.code}</p>
                      </div>
                      <div>{item.issuedDate}</div>
                    </td>
                    <td>
                      <div
                         style={getStyles(item.approveOrder)}
                      >
                        {item.approveOrder}
                      </div>
                    </td>
                    <td>
                      <p>x{item.totalQuantity}</p>
                      <div>{item.total.toLocaleString("en-US").replace(/,/g, ".")} ₫</div>
                    </td>
                    <td>
                      <Link
                        onClick={() => {
                          handleLinkClick(index);
                          handleLinkClick1(`${item.id}`);
                          handleLinkClickOrderer(item.id);
                        }}
                      >
                        <p>Xem chi tiết và xác nhận</p>
                      </Link>
                    </td>
                  </tr>

                  {openRowIndex === index && (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          padding: "2rem",
                          background: "rgb(248 248 248)",
                        }}
                      >
                        {/* Nội dung của hàng xác nhận */}
                        <div style={{ marginBottom: "1rem" }}>
                          <FontAwesomeIcon icon={faUser} />{" "}
                          <label style={{ margin: "0 1rem" }}>
                            {Orderer.orderersName}({Orderer.shippingPhone})
                          </label>
                          / <FontAwesomeIcon icon={faLocationDot} />{" "}
                          <label>{Orderer.shippingAddress}</label>
                        </div>

                        <div>
                          <thead>
                            <tr style={{ background: "rgb(230 229 229)" }}>
                              <th style={{ width: "10%" }}>Sản phẩm</th>
                              <th style={{ width: "10%" }}>Số lượng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {OrderDetails.map((orderdetail, index1) => {
                              return (
                                <>
                                  <tr key={index1}>
                                    <td
                                      style={{
                                        background: "#fff",
                                        width: "75%",
                                      }}
                                    >
                                      <div style={{ display: "flex" }}>
                                        <div
                                          style={{
                                            marginRight: "0.5rem",
                                            width: "10%",
                                          }}
                                        >
                                          <img
                                            src={`https://localhost:7106/Images/${orderdetail.images}`}
                                            alt="hinh anh"
                                          />
                                        </div>
                                        <div style={{ width: "85%" }}>
                                          <div>{orderdetail.bookName}</div>
                                          <div>
                                            Mã sản phẩm:{" "}
                                            {orderdetail.productCode}
                                          </div>
                                          <div>
                                            Giá: {orderdetail.unitPrice.toLocaleString("en-US").replace(/,/g, ".")} ₫
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        background: "#fff",
                                        width: "25%",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          marginTop: "1.5rem",
                                        }}
                                      >
                                        <p>{orderdetail.quantity}</p>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DefaultOrder;
