import { Card, Col, Nav, Tab, TabContainer } from "react-bootstrap";
import "./MyOrder.css";
import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { Link, Outlet, Route, Router, Routes } from "react-router-dom";
import MyOrderInfo from "./MyOrderInfo";

const MyOrder = () => {
  const [ListOfOrders, setListOfOrders] = useState([]);
  var userId = "ec1f2da0-bab0-4e5d-bb2b-6b252f0375a6"; // nếu muốn test hãy nhập ID của user vào biến userId, chưa phan quyen

  const handleNavSelect = (selectedKey) => {
    AxiosClient.get(`Invoices/ListOfOrder/${userId}/${selectedKey}`).then((res) => {
      setListOfOrders(res.data);
    });
  };

  useEffect(() => {
    handleNavSelect();
  }, []);

  return (
    <>
      <TabContainer defaultActiveKey="default">
        <div className="backgroundInfo">
          <Nav className="navbarMyorder" onSelect={handleNavSelect}>
            <Nav.Item className="itemnavbarMyorder">
              <Nav.Link eventKey="default">Tất cả đơn</Nav.Link>
            </Nav.Item>

            <Nav.Item className="itemnavbarMyorder ">
              <Nav.Link eventKey="ordered">Đã đặt</Nav.Link>
            </Nav.Item>

            <Nav.Item className="itemnavbarMyorder ">
              <Nav.Link eventKey="confirmed">Đã xác nhận</Nav.Link>
            </Nav.Item>

            <Nav.Item className="itemnavbarMyorder ">
              <Nav.Link eventKey="transported">Đang vận chuyển</Nav.Link>
            </Nav.Item>

            <Nav.Item className="itemnavbarMyorder ">
              <Nav.Link eventKey="delivered">Đã giao</Nav.Link>
            </Nav.Item>

            <Nav.Item className="itemnavbarMyorder ">
              <Nav.Link eventKey="canceled">Đã hủy</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <Tab.Content>
          <Tab.Pane eventKey="default">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>

          <Tab.Pane eventKey="ordered">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>

          <Tab.Pane eventKey="confirmed">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>

          <Tab.Pane eventKey="transported">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>

          <Tab.Pane eventKey="delivered">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>

          <Tab.Pane eventKey="canceled">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>
        </Tab.Content>
      </TabContainer>
    </>
  );
};
export default MyOrder;
