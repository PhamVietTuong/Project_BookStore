import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosClient from "../Axios/AxiosClient";

const Header = () => {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        AxiosClient.get(`/Carts/listCart`).then((res) => {
            setCarts(res.data);
        })
    }, []);

    return (
        <>
            <header id="header">
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

                            <Link to="" className="header__call-icon-wrap ml-3 ">
                                <div className="header__call-info navbar">
                                    <div className="nav-item dropdown">
                                        <i className="fas fa-user-circle header__user-icon"></i>
                                        <div className="header__call-text">Tài khoản</div>
                                        <div className="dropdown-menu">
                                            <Link to="info" className="dropdown-item">Thông tin tài khoản</Link>
                                            <Link to="order" className="dropdown-item">Đơn hàng của tôi</Link>
                                        </div>
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

                {/* <div className="header__nav">
                    <div className="container">
                        <section className="row">
                            <div className="header__nav-menu-wrap col-lg-3 col-md-0 col-sm-0">
                                <i className="fas fa-bars header__nav-menu-icon"></i>
                                <div className="header__nav-menu-title">Danh mục sản phẩm</div>
                            </div>

                            <div className="header__nav col-lg-9 col-md-0 col-sm-0">
                                <ul className="header__nav-list">
                                    <li className="header__nav-item">
                                        <a href="index.html" className="header__nav-link">Trang chủ</a>
                                    </li>
                                    <li className="header__nav-item">
                                        <a href="category.html" className="header__nav-link">Danh mục sản phẩm</a>
                                    </li>
                                    <li className="header__nav-item">
                                        <a href="product.html" className="header__nav-link">Sản phẩm</a>
                                    </li>
                                    <li className="header__nav-item">
                                        <a href="post.html" className="header__nav-link">Bài viết</a>
                                    </li>
                                    <li className="header__nav-item">
                                        <a href="#" className="header__nav-link">Tuyển cộng tác viên</a>
                                    </li>
                                    <li className="header__nav-item">
                                        <a href="contact.html" className="header__nav-link">Liên hệ</a>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div> */}
            </header>
        </>
    );
}

export default Header;