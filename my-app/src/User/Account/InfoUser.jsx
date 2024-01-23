import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import './infoUser.css';
import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import MyOrder from "./MyOrder";

const InfoUser = ({ activeTab }) => {
    const [listFavourite, setlistFavourite] = useState([]);

    // useEffect(() => {
    //     AxiosClient.get(`/Books/listFavourite`).then(res => setlistFavourite(res.data))
    // }, []);

    return (
        <>
            <div className="backgroundInfo">
                <div className="container" style={{marginRight: "10rem", paddingTop: "1rem"}}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab}>
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
                                        <Nav.Link eventKey="info" as={Link} to="/info">
                                            <i className="far fa-user iconOrderManagement"></i>
                                            Thông tin tài khoản
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="order" as={Link} to="/order">
                                            <i className="far fa-file-alt iconOrderManagement"></i>
                                                Quản lí đơn hàng
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="favourite">
                                            <i className="far fa-heart iconOrderManagement"></i>
                                            Sản phẩm yêu thích
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9} className="mt-4">
                                <Tab.Content>
                                    <Tab.Pane eventKey="info">Thông tin của tôi</Tab.Pane>

                                    <Tab.Pane eventKey="order">
                                        <div className="myOrder">Đơn hàng của tôi</div>
                                        <Card className="cardBody">
                                            <Card.Body style={{padding:"0px"}}><MyOrder/></Card.Body>
                                        </Card>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="favourite">
                                        <div className="myOrder">Danh sách yêu thích ({listFavourite.length})</div>
                                        <Card className="cardBody">
                                            <ul className="list">
                                                {
                                                    listFavourite.map(item=>{
                                                        return(
                                                            <>
                                                                <li className="item">
                                                                    <button className="btn-delete">
                                                                        ×
                                                                    </button>
                                                                    <div className="thumbnail">
                                                                        <a href="#">
                                                                            <div className="jDowEZ loaded">
                                                                                <img src={`https://localhost:7106/images/${item.fileName}`} />
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                    <div className="body">
                                                                        <a href="#" className="name">
                                                                            {item.name}
                                                                        </a>
                                                                        <div className="rating">
                                                                            <div className="rating__base">
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                            </div>
                                                                            <div className="rating__progress" style={{ width: "100%" }}>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                            </div>
                                                                        </div>
                                                                        <span className="review-count">
                                                                            (1859 nhận xét)
                                                                        </span>
                                                                    </div>
                                                                    <div className="footer">
                                                                        <div className="price has-discount">
                                                                            {item.priceAfterPromotion.toLocaleString("en-US").replace(/,/g, '.')}₫
                                                                        </div>
                                                                        <div className="wrap">
                                                                            <div className="list-price">{item.price.toLocaleString("en-US").replace(/,/g, '.')}</div>
                                                                            <div className="discount">
                                                                                -{item.promotionPercentage}%
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        )
                                                    })
                                                }
                                                
                                            </ul>
                                        </Card>
                                    </Tab.Pane>

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