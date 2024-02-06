import { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup, Nav, Row, Tab, Tabs } from "react-bootstrap";
import './Main.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import AxiosClient from "../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";

const Main = () => {
    const [Slideshows, setSlideshows] = useState([]);
    const [Products, setProducts] = useState([]);
    const [activeKey, setActiveKey] = useState('default');
    const [categories, setCategories] = useState([]);
    const [fromPrice, setFormPrice] = useState(0);
    const [toThePrice, setToThePrice] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => { 
        try {
            AxiosClient.get(`/Slideshows`).then((res) => { setSlideshows(res.data); });
            AxiosClient.get(`/Books/listBook`).then((res) => { setProducts(res.data); });
            AxiosClient.get(`/Categories`).then((res) => { setCategories(res.data); });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll); };
    }, []);

    const handleScroll = () => { setIsVisible(window.scrollY > 20); }

    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }) }

    const handleTabChange = (key) => { setActiveKey(key); };

    const handleFromPrice = (e) => { setFormPrice(parseInt(e.target.value.replace(/[^\d]/g, ''), 10) || 1) }

    const handleToThePrice = (e) => { setToThePrice(parseInt(e.target.value.replace(/[^\d]/g, ''), 10) || 1) }
    
    const formatNumber = (number) => {
        return number.toLocaleString('vi-VN'); 
    };

    const takeTheListByPrice = async (fromPrice, toThePrice) => {
        await AxiosClient.get(`/Books/getTheListByPrice`, {
            params: {
                FromPrice: fromPrice,
                ToThePrice: toThePrice
            }
        }).then(res => setProducts(res.data))
    }

    const handleTakeTheListPrice = async (name) => {
        if (name === "underForty") {
            try {
                await takeTheListByPrice(0, 40000);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        else if (name === "fortyToOneHundredAndTwenty")  {
            try {
                await takeTheListByPrice(40000, 120000);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        else if (name === "oneHundredAndTwentyToTwoHundredAndEighty") {
            try {
                await takeTheListByPrice(120000, 280000);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        else if (name === "aboveTwoHundredAndEighty") {
            try {
                await takeTheListByPrice(280000, Number.MAX_SAFE_INTEGER);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        else {
            try {
                await takeTheListByPrice(fromPrice, toThePrice);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }

    const handleTakeTheListByCategory = async (name) => {
        try {
            AxiosClient.get(`/Books/getTheListByCategory`, {
                params: {
                    CategoryName: name
                }
            }).then(res => setProducts(res.data))
        } catch (error) {
            console.log(error);
        }
    } 

    const handleDescendingPrice = async () => {
        try {
            AxiosClient.get(`/Books/descendingPrice`).then((res) => { setProducts(res.data); });

        } catch (error) {
            console.log(error);
        }
    }

    const handleAscendingPrice = async () => {
        try {
            AxiosClient.get(`/Books/ascendingPrice`).then((res) => { setProducts(res.data); });

        } catch (error) {
            console.log(error);
        }
    }

    const handleTakeTheListDefault = async () => {
        try {
            AxiosClient.get(`/Books/listBook`).then((res) => { setProducts(res.data);});

        } catch (error) {
            console.log(error);
        }
    }

    const handleProductNewt = async () => {
        try {
            AxiosClient.get(`/Books/productNew`).then((res) => { setProducts(res.data); console.log(res.data); });

        } catch (error) {
            console.log(error);
        }
    }

    const handleHighestQuantitySold = async () => {
        try {
            AxiosClient.get(`/Books/highestQuantitySold`).then((res) => { setProducts(res.data); });

        } catch (error) {
            console.log(error);
        }
    }

     return (
        <>
             {isVisible && (<button id="myBtn-scroll" onClick={scrollToTop} title="Go to top"><i class="fas fa-chevron-up" /></button>)}

            <div style={{ background: "#eff0f3", paddingBottom: "2rem" }}>
                <div className="hfMLFx">
                    <Row className="goUqEt">
                        <Col sm={2} className="ctRRBS mt-4">
                            <div className="block">
                                <h4 className="title">Danh Mục Sản Phẩm</h4>
                                <div className="list collapsed">
                                    {
                                        categories.map(item => {
                                            return (
                                                <>
                                                    <div className="item" style={{ paddingLeft: "0px" }} onClick={()=>handleTakeTheListByCategory(item.name)}>
                                                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="block">
                                <h4 className="title">Đánh giá</h4>
                                <div className="rating-list">
                                    <a href="#" className="item" style={{ paddingLeft: "0px" }}>
                                        <p className="hlnKeG" style={{ fontSize: "15px", display: "inline-block" }}>
                                            <Rating defaultValue={5} readOnly />
                                        </p>
                                        <span className="text">từ 5 sao</span>
                                    </a>

                                    <a href="#" className="item" style={{ paddingLeft: "0px" }}>
                                        <p className="hlnKeG" style={{ fontSize: "15px", display: "inline-block" }}>
                                            <Rating defaultValue={4} readOnly />
                                        </p>
                                        <span className="text">từ 4 sao</span>
                                    </a>

                                    <a href="#" className="item" style={{ paddingLeft: "0px" }}>
                                        <p className="hlnKeG" style={{ fontSize: "15px", display: "inline-block" }}>
                                            <Rating defaultValue={3} readOnly />
                                        </p>
                                        <span className="text">từ 3 sao</span>
                                    </a>
                                </div>
                            </div>
                            <div className="block">
                                <h4 className="title">Giá</h4>
                                <div className="fast-price-filter">
                                     <div className="item" onClick={() => handleTakeTheListPrice("underForty")}>
                                        <span>Dưới 40.000</span>
                                    </div>
                                     <div className="item" onClick={() => handleTakeTheListPrice("fortyToOneHundredAndTwenty")}>
                                        <span >40.000 <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "10px" }} /> 120.000</span>
                                    </div>
                                     <div className="item" onClick={() => handleTakeTheListPrice("oneHundredAndTwentyToTwoHundredAndEighty")}>
                                         <span >120.000 <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "10px" }} /> 280.000</span>
                                     </div>
                                     <div className="item" onClick={() => handleTakeTheListPrice("aboveTwoHundredAndEighty")}>
                                         <span >Trên 280.000</span>
                                     </div>
                                </div>

                                <div className="price-small-text">Chọn khoảng giá</div>

                                <InputGroup className="mb-3">
                                     <FormControl 
                                        aria-label="Giá từ" 
                                         value={formatNumber(fromPrice)}
                                         onChange={handleFromPrice}
                                    />
                                    <span>-</span>
                                     <FormControl 
                                        aria-label="Giá đến" 
                                         value={formatNumber(toThePrice)}
                                        onChange={handleToThePrice}
                                    />
                                     <Button variant="outline-secondary" onClick={() => handleTakeTheListPrice()}>
                                        Áp dụng
                                    </Button>
                                </InputGroup>
                            </div>
                        </Col>
                        <Col sm={10} className="jxmsjJ mt-4"> <div className="jxmsjJ">
                            <div className="inner">
                                <Tab.Container activeKey={activeKey} onSelect={handleTabChange}>

                                    <div className="search-summary">
                                        <div className="title">
                                            <h2>Nhà Sách Tiki</h2></div>
                                        <div style={{ padding: "0px 15px", marginTop: "12px" }}>
                                            <div className="slick-slider jgCwDI slick-initialized">
                                                <Swiper
                                                    watchSlidesProgress={true}
                                                    slidesPerView={2}
                                                    modules={[Pagination, Navigation]}
                                                    loop={true}
                                                    navigation={true}
                                                    className="mySwiper"
                                                    pagination={{
                                                        clickable: true,
                                                    }}
                                                >
                                                    {
                                                        Slideshows.map((item) => {
                                                            return (
                                                                <SwiperSlide className="main-swiper-slide" >

                                                                    <a href="" className="wbnRK">
                                                                        <div className={`carousel-item active`}>
                                                                            <img src={`https://localhost:7106/images/${item.fileName}`} className="d-block w-100"
                                                                                alt="Slideshow" />
                                                                        </div>
                                                                    </a>

                                                                </SwiperSlide>
                                                            )
                                                        })
                                                    }
                                                </Swiper>
                                            </div>
                                        </div>

                                        <div className="bPvyTV">
                                            <div className="ishnWO">
                                                <div className="dfCYMA">
                                                    <div className="sort-list">
                                                        <Nav variant="pills">
                                                            <Nav.Item>
                                                                 <Nav.Link eventKey="default" onClick={handleTakeTheListDefault}>Phổ Biến</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="topSeller" onClick={handleHighestQuantitySold}>Bán Chạy</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                 <Nav.Link eventKey="newest" onClick={handleProductNewt}>Hàng mới</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                 <Nav.Link eventKey="priceAsc" onClick={handleAscendingPrice}>Giá Thấp Đến Cao</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                 <Nav.Link eventKey="priceDesc" onClick={handleDescendingPrice}>Giá Cao Đến Thấp</Nav.Link>
                                                             </Nav.Item>
                                                        </Nav>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="default">
                                            <div className="row mt-2">{
                                                Products.map(item => {
                                                    return (
                                                        <>
                                                            <div className="col-lg-3 listProduct">
                                                                <Link to={`detail/${item.id}`} className="card card-hover">
                                                                    <div className="image-wrapper">
                                                                        <img src={`https://localhost:7106/images/${item.fileName}`} alt=""
                                                                            className="product__panel-img" style={{ width: "100%", height: "100%", opacity: "1" }} />
                                                                    </div>
                                                                    <div style={{ height: "188px", minHeight: "158px", display: "flex", flexDirection: "column" }}>
                                                                        <div className="product-info">
                                                                            <div className="product-name-star-sold">
                                                                                <h3 className="product__panel-link contentName">
                                                                                    {item.name}
                                                                                </h3>
                                                                                <div className="product_star_sold">
                                                                                    <div className="product__panel-rate-wrap">
                                                                                        <p className="hlnKeG" style={{ fontSize: "15px", display: "inline-block" }}>
                                                                                            <Rating defaultValue={item.star} readOnly />
                                                                                        </p>
                                                                                    </div>
                                                                                    <span className="quantity hasBorder">Đã bán {item.quantitySold || 0}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <div className="price-discount has-discount">
                                                                                    <div className="price-discount_price">
                                                                                        {item.price.toLocaleString("en-US").replace(/,/g, '.')}
                                                                                        <sup>₫</sup>
                                                                                    </div>

                                                                                    <div className="product__panel-price-sale-off">
                                                                                        -{item.promotionPercentage || 0}%

                                                                                    </div>
                                                                                </div>
                                                                            </div >

                                                                        </div>

                                                                        <div style={{ marginInline: "8px" }}>
                                                                            <div className="product-now">
                                                                                <img width="32" height="16" src="images1/now.png" alt="" />
                                                                                <span>Giao siêu tốc 2h</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }</div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="topSeller">
                                             <div className="row mt-2">{
                                                 Products.map(item => {
                                                     return (
                                                         <>
                                                             <div className="col-lg-3 listProduct">
                                                                 <Link to={`detail/${item.id}`} className="card card-hover">
                                                                     <div className="image-wrapper">
                                                                         <img src={`https://localhost:7106/images/${item.fileName}`} alt=""
                                                                             className="product__panel-img" style={{ width: "100%", height: "100%", opacity: "1" }} />
                                                                     </div>
                                                                     <div style={{ height: "188px", minHeight: "158px", display: "flex", flexDirection: "column" }}>
                                                                         <div className="product-info">
                                                                             <div className="product-name-star-sold">
                                                                                 <h3 className="product__panel-link contentName">
                                                                                     {item.name}
                                                                                 </h3>
                                                                                 <div className="product_star_sold">
                                                                                     <div className="product__panel-rate-wrap">
                                                                                         <p className="hlnKeG" style={{ fontSize: "15px", display: "inline-block" }}>
                                                                                             <Rating defaultValue={item.star} readOnly />
                                                                                         </p>
                                                                                     </div>
                                                                                     <span className="quantity hasBorder">Đã bán {item.quantitySold || 0}</span>
                                                                                 </div>
                                                                             </div>
                                                                             <div>
                                                                                 <div className="price-discount has-discount">
                                                                                     <div className="price-discount_price">
                                                                                         {item.price.toLocaleString("en-US").replace(/,/g, '.')}
                                                                                         <sup>₫</sup>
                                                                                     </div>

                                                                                     <div className="product__panel-price-sale-off">
                                                                                         -{item.promotionPercentage || 0}%
                                                                                     </div>
                                                                                 </div>
                                                                             </div >

                                                                         </div>

                                                                         <div style={{ marginInline: "8px" }}>
                                                                             <div className="product-now">
                                                                                 <img width="32" height="16" src="images1/now.png" alt="" />
                                                                                 <span>Giao siêu tốc 2h</span>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                 </Link>
                                                             </div>
                                                         </>
                                                     )
                                                 })
                                             }</div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="newest">
                                             <div className="row mt-2">{
                                                 Products.map(item => {
                                                     return (
                                                         <>
                                                             <div className="col-lg-3 listProduct">
                                                                 <Link to={`detail/${item.id}`} className="card card-hover">
                                                                     <div className="image-wrapper">
                                                                         <img src={`https://localhost:7106/images/${item.fileName}`} alt=""
                                                                             className="product__panel-img" style={{ width: "100%", height: "100%", opacity: "1" }} />
                                                                     </div>
                                                                     <div style={{ height: "188px", minHeight: "158px", display: "flex", flexDirection: "column" }}>
                                                                         <div className="product-info">
                                                                             <div className="product-name-star-sold">
                                                                                 <h3 className="product__panel-link contentName">
                                                                                     {item.name}
                                                                                 </h3>
                                                                                 <div className="product_star_sold">
                                                                                     <div className="product__panel-rate-wrap">
                                                                                         <p className="hlnKeG" style={{ fontSize: "15px", display: "inline-block" }}>
                                                                                             <Rating defaultValue={item.star} readOnly />
                                                                                         </p>
                                                                                     </div>
                                                                                     <span className="quantity hasBorder">Đã bán {item.quantitySold || 0}</span>
                                                                                 </div>
                                                                             </div>
                                                                             <div>
                                                                                 <div className="price-discount has-discount">
                                                                                     <div className="price-discount_price">
                                                                                         {item.price.toLocaleString("en-US").replace(/,/g, '.')}
                                                                                         <sup>₫</sup>
                                                                                     </div>

                                                                                     <div className="product__panel-price-sale-off">
                                                                                         -{item.promotionPercentage || 0}%

                                                                                     </div>
                                                                                 </div>
                                                                             </div >

                                                                         </div>

                                                                         <div style={{ marginInline: "8px" }}>
                                                                             <div className="product-now">
                                                                                 <img width="32" height="16" src="images1/now.png" alt="" />
                                                                                 <span>Giao siêu tốc 2h</span>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                 </Link>
                                                             </div>
                                                         </>
                                                     )
                                                 })
                                             }</div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="priceAsc">
                                             <div className="row mt-2">{
                                                 Products.map(item => {
                                                     return (
                                                         <>
                                                             <div className="col-lg-3 listProduct">
                                                                 <Link to={`detail/${item.id}`} className="card card-hover">
                                                                     <div className="image-wrapper">
                                                                         <img src={`https://localhost:7106/images/${item.fileName}`} alt=""
                                                                             className="product__panel-img" style={{ width: "100%", height: "100%", opacity: "1" }} />
                                                                     </div>
                                                                     <div style={{ height: "188px", minHeight: "158px", display: "flex", flexDirection: "column" }}>
                                                                         <div className="product-info">
                                                                             <div className="product-name-star-sold">
                                                                                 <h3 className="product__panel-link contentName">
                                                                                     {item.name}
                                                                                 </h3>
                                                                                 <div className="product_star_sold">
                                                                                     <div className="product__panel-rate-wrap">
                                                                                         <p className="hlnKeG" style={{ fontSize: "15px", display: "inline-block" }}>
                                                                                             <Rating defaultValue={item.star} readOnly />
                                                                                         </p>
                                                                                     </div>
                                                                                     <span className="quantity hasBorder">Đã bán {item.quantitySold || 0}</span>
                                                                                 </div>
                                                                             </div>
                                                                             <div>
                                                                                 <div className="price-discount has-discount">
                                                                                     <div className="price-discount_price">
                                                                                         {item.price.toLocaleString("en-US").replace(/,/g, '.')}
                                                                                         <sup>₫</sup>
                                                                                     </div>

                                                                                     <div className="product__panel-price-sale-off">
                                                                                         -{item.promotionPercentage || 0}%

                                                                                     </div>
                                                                                 </div>
                                                                             </div >

                                                                         </div>

                                                                         <div style={{ marginInline: "8px" }}>
                                                                             <div className="product-now">
                                                                                 <img width="32" height="16" src="images1/now.png" alt="" />
                                                                                 <span>Giao siêu tốc 2h</span>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                 </Link>
                                                             </div>
                                                         </>
                                                     )
                                                 })
                                             }</div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="priceDesc">
                                             <div className="row mt-2">{
                                                 Products.map(item => {
                                                     return (
                                                         <>
                                                             <div className="col-lg-3 listProduct">
                                                                 <Link to={`detail/${item.id}`} className="card card-hover">
                                                                     <div className="image-wrapper">
                                                                         <img src={`https://localhost:7106/images/${item.fileName}`} alt=""
                                                                             className="product__panel-img" style={{ width: "100%", height: "100%", opacity: "1" }} />
                                                                     </div>
                                                                     <div style={{ height: "188px", minHeight: "158px", display: "flex", flexDirection: "column" }}>
                                                                         <div className="product-info">
                                                                             <div className="product-name-star-sold">
                                                                                 <h3 className="product__panel-link contentName">
                                                                                     {item.name}
                                                                                 </h3>
                                                                                 <div className="product_star_sold">
                                                                                     <div className="product__panel-rate-wrap">
                                                                                         <p className="hlnKeG" style={{ fontSize: "15px", display: "inline-block" }}>
                                                                                             <Rating defaultValue={item.star} readOnly />
                                                                                         </p>
                                                                                     </div>
                                                                                     <span className="quantity hasBorder">Đã bán {item.quantitySold || 0}</span>
                                                                                 </div>
                                                                             </div>
                                                                             <div>
                                                                                 <div className="price-discount has-discount">
                                                                                     <div className="price-discount_price">
                                                                                         {item.price.toLocaleString("en-US").replace(/,/g, '.')}
                                                                                         <sup>₫</sup>
                                                                                     </div>

                                                                                     <div className="product__panel-price-sale-off">
                                                                                         -{item.promotionPercentage || 0}%

                                                                                     </div>
                                                                                 </div>
                                                                             </div >

                                                                         </div>

                                                                         <div style={{ marginInline: "8px" }}>
                                                                             <div className="product-now">
                                                                                 <img width="32" height="16" src="images1/now.png" alt="" />
                                                                                 <span>Giao siêu tốc 2h</span>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                 </Link>
                                                             </div>
                                                         </>
                                                     )
                                                 })
                                             }</div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                                {/* <div className="iSZIiE">
                                    <div>
                                        Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Main;