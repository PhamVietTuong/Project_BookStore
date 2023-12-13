import { useEffect, useState } from "react";

const BestProduct = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => { window.removeEventListener("scroll", handleScroll); };
    }, []);

    const handleScroll = () => {
        setIsVisible(window.scrollY > 20);
    }

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }
    return (
        <>
            {isVisible && (<button id="myBtn-scroll" onClick={scrollToTop} title="Go to top"><i class="fas fa-chevron-up"/></button>)}
            <section className="bestselling">
                <div className="container">
                    <div className="row">
                        <div className="bestselling__heading-wrap">
                            <img src="images/bestselling.png" alt="Sản phẩm bán chạy" className="bestselling__heading-img" />
                            <div className="bestselling__heading">Top bán chạy nhất tuần</div>
                        </div>
                    </div>

                    <section className="row">
                        <div className="bestselling__product col-lg-4 col-md-6 col-sm-12">
                            <div className="bestselling__product-img-box">
                                <img src="images1/product/image_195509_1_22250_thanh_ly_1.jpg" alt="Biểu tượng thất truyền"
                                    className="bestselling__product-img" />
                            </div>
                            <div className="bestselling__product-text">
                                <h3 className="bestselling__product-title">
                                    <a href="#" className="bestselling__product-link">Biểu tượng thất truyền</a>
                                </h3>

                                <div className="bestselling__product-rate-wrap">
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                </div>

                                <span className="bestselling__product-price">
                                    147.000đ
                                </span>

                                <div className="bestselling__product-btn-wrap">
                                    <button className="bestselling__product-btn">Xem hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="bestselling__product col-lg-4 col-md-6 col-sm-12">
                            <div className="bestselling__product-img-box">
                                <img src="images1/product/image_195509_1_31875.jpg" alt="Hỏa Ngục (Tái bản 2020)"
                                    className="bestselling__product-img" />
                            </div>
                            <div className="bestselling__product-text">
                                <h3 className="bestselling__product-title">
                                    <a href="#" className="bestselling__product-link">Hỏa Ngục (Tái bản 2020)</a>
                                </h3>

                                <div className="bestselling__product-rate-wrap">
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                </div>

                                <span className="bestselling__product-price">
                                    219.000đ
                                </span>

                                <div className="bestselling__product-btn-wrap">
                                    <button className="bestselling__product-btn">Xem hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="bestselling__product col-lg-4 col-md-6 col-sm-12">
                            <div className="bestselling__product-img-box">
                                <img src="images1/product/tr_-tue-do-thai_outline_15.9.2017-02.jpg"
                                    alt="Trí Tuệ Do Thái (Tái Bản 2018)" className="bestselling__product-img" />
                            </div>
                            <div className="bestselling__product-text">
                                <h3 className="bestselling__product-title">
                                    <a href="#" className="bestselling__product-link">Trí Tuệ Do Thái (Tái Bản 2018)</a>
                                </h3>

                                <div className="bestselling__product-rate-wrap">
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                </div>

                                <span className="bestselling__product-price">
                                    169.000đ
                                </span>

                                <div className="bestselling__product-btn-wrap">
                                    <button className="bestselling__product-btn">Xem hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="bestselling__product col-lg-4 col-md-6 col-sm-12">
                            <div className="bestselling__product-img-box">
                                <img src="images1/product/image_195509_1_36793.jpg" alt="Nhà Giả Kim (Tái Bản 2020)"
                                    className="bestselling__product-img" />
                            </div>
                            <div className="bestselling__product-text">
                                <h3 className="bestselling__product-title">
                                    <a href="#" className="bestselling__product-link">Nhà Giả Kim (Tái Bản 2020)</a>
                                </h3>

                                <div className="bestselling__product-rate-wrap">
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                </div>

                                <span className="bestselling__product-price">
                                    79.000đ
                                </span>

                                <div className="bestselling__product-btn-wrap">
                                    <button className="bestselling__product-btn">Xem hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="bestselling__product col-lg-4 col-md-6 col-sm-12">
                            <div className="bestselling__product-img-box">
                                <img src="images1/product/image_180164_2_287.jpg" alt="Tuổi Trẻ Đáng Giá Bao Nhiêu? "
                                    className="bestselling__product-img" />
                            </div>
                            <div className="bestselling__product-text">
                                <h3 className="bestselling__product-title">
                                    <a href="#" className="bestselling__product-link">Tuổi Trẻ Đáng Giá Bao Nhiêu? </a>
                                </h3>

                                <div className="bestselling__product-rate-wrap">
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                </div>

                                <span className="bestselling__product-price">
                                    80.000đ
                                </span>

                                <div className="bestselling__product-btn-wrap">
                                    <button className="bestselling__product-btn">Xem hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="bestselling__product col-lg-4 col-md-6 col-sm-12">
                            <div className="bestselling__product-img-box">
                                <img src="images1/product/ttdc01.jpg" alt="Thám Tử Đã Chết - Tập 1 - Tặng Kèm Bookmark Tròn"
                                    className="bestselling__product-img" />
                            </div>
                            <div className="bestselling__product-text">
                                <h3 className="bestselling__product-title">
                                    <a href="#" className="bestselling__product-link">Thám Tử Đã Chết - Tập 1 - Tặng Kèm
                                        Bookmark Tròn</a>
                                </h3>

                                <div className="bestselling__product-rate-wrap">
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                    <i className="fas fa-star bestselling__product-rate"></i>
                                </div>

                                <span className="bestselling__product-price">
                                    119.000đ
                                </span>

                                <div className="bestselling__product-btn-wrap">
                                    <button className="bestselling__product-btn">Xem hàng</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="row bestselling__banner">

                        <div className="bestselling__banner-left col-lg-6">
                            <img src="images1/banner/920x420_phienchodocu.png" alt="Banner quảng cáo"
                                className="bestselling__banner-left-img" />
                        </div>
                        <div className="bestselling__banner-right col-lg-6">
                            <img src="images1/banner/muonkiepnhansinh_resize_920x420.jpg" alt="Banner quảng cáo"
                                className="bestselling__banner-right-img" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BestProduct;