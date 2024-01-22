import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosClient from "../Axios/AxiosClient";
import { Button, Modal } from "react-bootstrap";
import Login from "../Login/Login";
import '../User/Header.css'
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
const Header = () => {
    const [carts, setCarts] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    var jwt = localStorage.getItem("jwt")
    var navigate = useNavigate();
    let menu;
    useEffect(() => {
        AxiosClient.get(`/Carts/listCart`).then((res) => {
            setCarts(res.data);
        })
    }, []);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const logout = async () => {
        try {
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.log("Logout error", error);
        }
    }

    if (jwt) {
        menu = (
            <div className="dropdown-menu">
                <Link to="info" className="dropdown-item">Thông tin tài khoản</Link>
                <Link to="order" className="dropdown-item">Đơn hàng của tôi</Link>
                <Link to="" className="dropdown-item" onClick={logout}>Đăng xuất</Link>
            </div>
        )
    }
    else {
        menu = (
            <div className="dropdown-menu">
                <Link to="" className="dropdown-item" onClick={handleShowLogin}>Đăng nhập</Link>
                <Link to="" className="dropdown-item" onClick={handleShowRegister}>Đăng ký</Link>
            </div>
        )
    }
   
    return (
        <>
                <div className="container">
                    <section className="row">
                        <div className="col-lg-2 col-md-4 col-sm-12 header__logo">
                            <h1 className="header__heading">
                                <a href="#" className="header__logo-link">
                                    <img src="/images1/tiki.png" alt="Logo" className="header__logo-img" />
                                </a>
                            </h1>
                        </div>

                        <div className="col-lg-7 col-md-7 col-sm-0 header__search">
                            <input type="text" className="header__search-input" placeholder="Tìm kiếm tại đây..." />
                            <button className="header__search-btn">
                                <div className="header__search-icon-wrap">
                                    <i className="fas fa-search header__search-icon"></i>
                                </div>
                            </button>
                        </div>

                        <div className="col-lg-3 header__call">


                            <Link to="" className="header__call-icon-wrap">
                                <i className="fas fa-home header__call-icon"></i>
                                <div className="header__call-info">
                                    <div className="header__call-text" >
                                        Trang chủ
                                    </div>
                                </div>
                            </Link>

                            <Link to="" className="header__call-icon-wrap ml-3 " >
                            <div className="header__call-info navbar">
                                <div className="nav-item dropdown">
                                    <i className="fas fa-user-circle header__user-icon"></i>
                                    <div className="header__call-text">Tài khoản</div>
                                        {menu}
                                </div>
                            </div>
                            </Link>
                            <Link to="cart" className="header__call-icon-wrap ml-3">
                                <span className="header__notice">{carts.length}</span>
                                <i className="fas fa-shopping-cart header__nav-cart-icon"></i>
                                <div className="header__call-info">
                                    <div className="header__call-text">
                                        Giỏ hàng
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </section>
                </div>
            <ModalLogin show={showLogin} handleClose={handleCloseLogin} />
            <ModalRegister show={showRegister} handleClose={handleCloseRegister} />
        </>
    );
}

export default Header;