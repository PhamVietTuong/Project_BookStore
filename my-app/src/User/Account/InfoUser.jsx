import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

const InfoUser = () => {
    return (
        <>
            <div className="backgroundInfo">
                <div className="container" style={{marginRight: "10rem", paddingTop: "1rem"}}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="info">
                        <Row>
                            <Col sm={3} className="mt-4 mb-3">
                                <div className="userInfo">
                                    <i className="fas fa-user-circle iconInfo"></i>
                                    <div className="info">
                                        Tài khoản của
                                        <span>Phạm Viết Tường</span>
                                    </div>
                                </div>
                                <Nav variant="pills" className="flex-column managementInfo">
                                    <Nav.Item>
                                        <Nav.Link eventKey="info">
                                            <i className="far fa-user iconOrderManagement"></i>
                                            Thông tin tài khoản
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="order">
                                            <i className="far fa-file-alt iconOrderManagement"></i>
                                                Quản lí đơn hàng
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9} className="mt-4">
                                <Tab.Content>
                                    <Tab.Pane eventKey="order">
                                        <div className="myOrder">Đơn hàng của tôi</div>
                                        <Card className="cardBody">
                                            <Card.Body></Card.Body>
                                        </Card>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="info">Thông tin của tôi</Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </>
    );
}

export default InfoUser;