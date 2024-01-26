import { Card, Nav, Tab, TabContainer, Table } from "react-bootstrap";
import "./Order.css";
import { Link, Outlet } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";
import ConfirmOrder from "./ConfirmOrder";
import TransferOrder from "./TranferOrder";
import ApproveOrder from "./ApproveOrder";
import DefaultOrder from "./DefaultOrder";
import CancelOrder from "./CancelOrder";
import DeliverOrder from "./DeliverOrder";

const OrderList = () => {
  const [ListOfInvoice, setListOfInvoice] = useState([]);

  const handleNavSelect = (selectedKey) => {
    AxiosClient.get(`Invoices/ListOfOrder/${selectedKey}`).then((res) => {
      setListOfInvoice(res.data);
    });
  };

  useEffect(() => {
    try {
      handleNavSelect();
    } catch {
      console.log("Error");
    }
  }, []);

  return (
    <>
      <TabContainer defaultActiveKey="approveOrder">
        <div className="backgroundInfo">
          <div>
            <div className="headernavbar">
              <h3>Danh sách đơn hàng</h3>
            </div>

            <div className="ishnWO ">
              <div className="dfCYMAa">
                <Nav className="sort-list" onSelect={handleNavSelect}>
                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="default">Tất cả đơn</Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="approveOrder">Chờ xác nhận</Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="confirmed">Đã xác nhận</Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="transported">Đang vận chuyển</Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="delivered">Đã giao</Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="canceled">Đơn hủy</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>

            <div>
              <Tab.Content>
                <Tab.Pane eventKey="default">
                  <DefaultOrder ListOfInvoice={ListOfInvoice} />
                </Tab.Pane>
              </Tab.Content>

              <Tab.Content>
                <Tab.Pane eventKey="approveOrder">
                  <ApproveOrder ListOfInvoice={ListOfInvoice} />
                </Tab.Pane>
              </Tab.Content>

              <Tab.Content>
                <Tab.Pane eventKey="confirmed">
                  <ConfirmOrder ListOfInvoice={ListOfInvoice} />
                </Tab.Pane>
              </Tab.Content>

              <Tab.Content>
                <Tab.Pane eventKey="transported">
                  <TransferOrder ListOfInvoice={ListOfInvoice} />
                </Tab.Pane>
              </Tab.Content>

              <Tab.Content>
                <Tab.Pane eventKey="delivered">
                  <DeliverOrder ListOfInvoice={ListOfInvoice} />
                </Tab.Pane>
              </Tab.Content>

              <Tab.Content>
                <Tab.Pane eventKey="canceled">
                  <CancelOrder ListOfInvoice={ListOfInvoice} />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </div>
      </TabContainer>
    </>
  );
};

export default OrderList;
