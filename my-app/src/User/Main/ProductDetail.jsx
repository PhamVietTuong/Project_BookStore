import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ProductDetail.css';
import { Pagination, Navigation } from 'swiper/modules';

const ProductDetail = () => {
    const { id } = useParams();
    const [Books, setBooks] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [activeImage, setActiveImage] = useState('');
    const [hoveredImage, setHoveredImage] = useState(null);
    const [count, setCount] = useState(1);
    const [totalAmount, settotalAmount] = useState(0);

    useEffect(() => {
        AxiosClient.get(`/Books/detail/${id}`)
            .then(res => {
                const book = res.data
                setBooks([book]);
                settotalAmount(book.price || 0);
                setSelectedImage(`https://localhost:7106/images/${book.imageName}` || '')
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    //Handle hover image
    const handleImageClick = (newImage) => {
        setSelectedImage(newImage);
        setActiveImage(newImage);
    };

    const handleImageHover = (hoverImage) => {
        setHoveredImage(hoverImage);
    };

    const handleImageLeave = () => {
        setHoveredImage(null);
    };

    //Handle minus and flus
    const handleIncrement = () => {
        setCount(count + 1);
        settotalAmount(totalAmount + (Books[0].price || 0));
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
            settotalAmount(totalAmount - (Books[0].price || 0))
        }
    };

    const handleInputChange = (event) => {
        const newValue = parseInt(event.target.value, 10) || 1;

        if (newValue > count) {
            settotalAmount(totalAmount + (newValue - count) * (Books[0].price || 0))
        }
        else if (newValue < count) {
            settotalAmount(totalAmount - (count - newValue) * (Books[0].price || 0))
        }

        setCount(newValue);
    };


    return (
        <>
            <div style={{ backgroundColor: "#f5f5fa" }}>;
                <div className="product_body">
                    <div className="product_main">
                        <Row className="mb-5">
                            {
                                Books.map(item => {
                                    return (
                                        <>
                                            <Col sm={4} className="product_image_main">

                                                <div className="product_header_image">
                                                    <div className="product_image_body">
                                                        <div className="" style={{ width: "368px", height: "368px" }}>
                                                            <div style={{ position: "relative", cursor: "pointer" }}>
                                                                <img
                                                                    src={hoveredImage || selectedImage}
                                                                    alt=""
                                                                    className="product_image"
                                                                    style={{ width: "368px", height: "368px", zIndex: "2", opacity: "1" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="image_badges"></div>
                                                    <div className="product_image_list_body">
                                                        <div className="product_image_list_main">
                                                            <Swiper
                                                                slidesPerView={7}
                                                                navigation={true}
                                                                modules={[Pagination, Navigation]}
                                                                className="mySwiper"
                                                                initialSlide={0}

                                                            >
                                                                <SwiperSlide>
                                                                    <a
                                                                        className={`image_active ${selectedImage === `https://localhost:7106/images/${item.imageName}` ? 'active' : ''}`}
                                                                        onClick={() => handleImageClick(`https://localhost:7106/images/${item.imageName}`)}
                                                                        onMouseOver={() => handleImageHover(`https://localhost:7106/images/${item.imageName}`)}
                                                                        onMouseLeave={handleImageLeave}
                                                                    >

                                                                        <img
                                                                            src={`https://localhost:7106/images/${item.imageName}`}
                                                                            alt=""
                                                                            className="product_image_list"
                                                                        />
                                                                    </a>
                                                                </SwiperSlide>

                                                                {/* <SwiperSlide><a
                                                                    className={`image_active ${selectedImage === '/images1/product/twd2_biaao_demo.jpg' ? 'active' : ''}`}
                                                                    onClick={() => handleImageClick('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseOver={() => handleImageHover('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseLeave={handleImageLeave}
                                                                >
                                                                    <img
                                                                        src="/images1/product/twd2_biaao_demo.jpg"
                                                                        alt=""
                                                                        className="product_image_list"
                                                                    />
                                                                </a></SwiperSlide>
                                                                <SwiperSlide><a
                                                                    className={`image_active ${selectedImage === '/images1/product/twd2_biaao_demo.jpg' ? 'active' : ''}`}
                                                                    onClick={() => handleImageClick('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseOver={() => handleImageHover('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseLeave={handleImageLeave}
                                                                >
                                                                    <img
                                                                        src="/images1/product/twd2_biaao_demo.jpg"
                                                                        alt=""
                                                                        className="product_image_list"
                                                                    />
                                                                </a></SwiperSlide>
                                                                <SwiperSlide><a
                                                                    className={`image_active ${selectedImage === '/images1/product/twd2_biaao_demo.jpg' ? 'active' : ''}`}
                                                                    onClick={() => handleImageClick('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseOver={() => handleImageHover('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseLeave={handleImageLeave}
                                                                >
                                                                    <img
                                                                        src="/images1/product/twd2_biaao_demo.jpg"
                                                                        alt=""
                                                                        className="product_image_list"
                                                                    />
                                                                </a></SwiperSlide>
                                                                <SwiperSlide><a
                                                                    className={`image_active ${selectedImage === '/images1/product/twd2_biaao_demo.jpg' ? 'active' : ''}`}
                                                                    onClick={() => handleImageClick('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseOver={() => handleImageHover('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseLeave={handleImageLeave}
                                                                >
                                                                    <img
                                                                        src="/images1/product/twd2_biaao_demo.jpg"
                                                                        alt=""
                                                                        className="product_image_list"
                                                                    />
                                                                </a></SwiperSlide>

                                                                <SwiperSlide><a
                                                                    className={`image_active ${selectedImage === '/images1/product/twd2_biaao_demo.jpg' ? 'active' : ''}`}
                                                                    onClick={() => handleImageClick('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseOver={() => handleImageHover('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseLeave={handleImageLeave}
                                                                >
                                                                    <img
                                                                        src="/images1/product/twd2_biaao_demo.jpg"
                                                                        alt=""
                                                                        className="product_image_list"
                                                                    />
                                                                </a></SwiperSlide>

                                                                <SwiperSlide><a
                                                                    className={`image_active ${selectedImage === '/images1/product/twd2_biaao_demo.jpg' ? 'active' : ''}`}
                                                                    onClick={() => handleImageClick('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseOver={() => handleImageHover('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseLeave={handleImageLeave}
                                                                >
                                                                    <img
                                                                        src="/images1/product/twd2_biaao_demo.jpg"
                                                                        alt=""
                                                                        className="product_image_list"
                                                                    />
                                                                </a></SwiperSlide>

                                                                <SwiperSlide><a
                                                                    className={`image_active ${selectedImage === '/images1/product/twd2_biaao_demo.jpg' ? 'active' : ''}`}
                                                                    onClick={() => handleImageClick('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseOver={() => handleImageHover('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseLeave={handleImageLeave}
                                                                >
                                                                    <img
                                                                        src="/images1/product/twd2_biaao_demo.jpg"
                                                                        alt=""
                                                                        className="product_image_list"
                                                                    />
                                                                </a></SwiperSlide>

                                                                <SwiperSlide><a
                                                                    className={`image_active ${selectedImage === '/images1/product/twd2_biaao_demo.jpg' ? 'active' : ''}`}
                                                                    onClick={() => handleImageClick('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseOver={() => handleImageHover('/images1/product/twd2_biaao_demo.jpg')}
                                                                    onMouseLeave={handleImageLeave}
                                                                >
                                                                    <img
                                                                        src="/images1/product/twd2_biaao_demo.jpg"
                                                                        alt=""
                                                                        className="product_image_list"
                                                                    />
                                                                </a></SwiperSlide> */}
                                                            </Swiper>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col sm={4} className="product_info">
                                                <div className="product_info_heder_body" style={{ gap: "16px" }}>
                                                    <div className="product_info_body">
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                            <div className="product_info_star_bookName">
                                                                <div className="product_info_header_main">
                                                                    <span className="brand-and-author no-after">
                                                                        <h6>
                                                                            Tác giả: {item.authorName}
                                                                        </h6>
                                                                    </span>
                                                                </div>

                                                                <h1 className="product_info_bookName">{item.name}</h1>

                                                                <div className="jzQKwa">
                                                                    <div style={{ display: "flex" }}>
                                                                        <div className="dXPbue">
                                                                            <div style={{ marginRight: "4px", fontSize: "14px", lineHeight: "150%", fontWeight: "500", marginTop: "3.1px" }}>
                                                                                5
                                                                            </div>
                                                                            <div style={{ display: "flex" }}>
                                                                                <div style={{ position: "relative" }}>
                                                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                                                        <div className="product__panel-rate-wrap">
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div style={{ width: "96%", whiteSpace: "nowrap", position: "absolute", left: "0", top: "0", overflow: "hidden" }}>
                                                                                        <div className="product__panel-rate-wrap">
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <a className="number">(2003111)</a>
                                                                            <div className="fctQDC"></div>
                                                                        </div>
                                                                        <div className="bExXAB"> Đã bán 5000+ </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                                                <div className="jFWyKZ">
                                                                    <div className="product-price">
                                                                        <div className="product-price__current-price">
                                                                            {item.price.toLocaleString("en-US").replace(/,/g, '.')}
                                                                            <sup>₫</sup>
                                                                        </div>
                                                                        <div className="product-price__discount-rate">
                                                                            -32%
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col sm={4} className="product_price">
                                                <div style={{ position: "sticky", top: "12px", display: "flex", flexDirection: "column", alignItems: "stretch", gap: "12px" }}>
                                                    <div className="iHMNqO" style={{ gap: "16px", overflow: "initial" }}>
                                                        <div className="kVRTMZ" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                                            <a> <img src="/images1/tiki.png" alt="" style={{ borderRadius: "50%", minWidth: "40px", width: "40px", height: "40px", opacity: "1" }} /> </a>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <span className="seller-name">
                                                                    <div className="jmFfcj">
                                                                        <a>
                                                                            <span>Tiki Trading</span>
                                                                        </a>
                                                                    </div>
                                                                </span>
                                                                <div className="TvlJT">
                                                                    <div className="item review">
                                                                        <div className="title">
                                                                            <span>4.7</span>
                                                                            <i className="fas fa-star product__panel-rate"></i>
                                                                        </div>
                                                                        <div className="sub-title">
                                                                            (5.4tr+ đánh giá)
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="hVrOaA" style={{ borderTop: "none" }}>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <div className="hEzlHi">
                                                                    <p className="lable">Số lượng</p>

                                                                    <div className="group-input">
                                                                        <div>
                                                                            <InputGroup>
                                                                                <Button variant="outline-secondary" onClick={handleDecrement} disabled={count <= 1}>
                                                                                    <i class="fas fa-minus"></i>
                                                                                </Button>

                                                                                <FormControl
                                                                                    aria-label="Count"
                                                                                    aria-describedby="basic-addon2"
                                                                                    value={count}
                                                                                    onChange={handleInputChange}
                                                                                />


                                                                                <Button variant="outline-secondary" onClick={handleIncrement}>
                                                                                    <i class="fas fa-plus"></i>
                                                                                </Button>
                                                                            </InputGroup>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="exLljd">
                                                                <div className="DxBpi">
                                                                    Tạm tính
                                                                </div>
                                                                <div className="egMRnV">
                                                                    {totalAmount.toLocaleString("en-US").replace(/,/g, '.')}
                                                                    <sup style={{ fontSize: "24px" }}>₫</sup>
                                                                </div>
                                                            </div>
                                                            <div className="group-button">
                                                                <button className="ijFBvx"> <span>Mua ngay</span></button>
                                                                <button type="button" className="eZIWqC"> <span>Thêm vào giỏ hàng</span></button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Col>
                                        </>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProductDetail;