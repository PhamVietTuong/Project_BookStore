import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import './infoUser.css';
import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import MyOrder from "./MyOrder";
import UserEdit from "../../Admin/User/UserEdit";
import ProductDetailList from "../../Admin/User/ProductDetailList";
import EditUser from "./EditUser";
const InfoUser = ({ activeTab }) => {
    const { id } = useParams();
    const [listFavourite, setlistFavourite] = useState([]);
    const location = useLocation();
    const cleanPathname = location.pathname.replace('/', '');
    const [user, setUser] = useState({});
    const accessToken = localStorage.getItem('userId');
    const [errors, setError] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await AxiosClient.get(`/Users/${accessToken}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Error fetching user data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <div className="backgroundInfo">
                <div className="container" style={{ marginRight: "10rem", paddingTop: "1rem" }}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey={cleanPathname} >
                        <Row>
                            <Col sm={3} className="mt-4 mb-3">
                                <div className="userInfo">
                                    <i className="fas fa-user-circle iconInfo"></i>
                                    <div className="info">
                                        Tài khoản của
                                        <span>{user.fullName}</span>
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
                                        <Nav.Link eventKey="favourite" as={Link} to="/favourite">
                                            <i className="far fa-heart iconOrderManagement"></i>
                                            Sản phẩm yêu thích
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9} className="mt-4">
                                <Tab.Content>
                                    <Tab.Pane eventKey="info">
                                        <EditUser></EditUser>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="order">
                                        <div className="myOrder">Đơn hàng của tôi</div>
                                        <Card className="cardBody">
                                            <Card.Body style={{ padding: "0px" }}><MyOrder /></Card.Body>
                                        </Card>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="favourite">
                                        <div className="myOrder">Danh sách yêu thích ({listFavourite.length})</div>
                                        {/* <ProductDetailList /> */}
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