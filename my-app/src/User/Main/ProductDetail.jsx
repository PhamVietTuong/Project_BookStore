import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ProductDetail.css';
import { Pagination, Navigation } from 'swiper/modules';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";


const ProductDetail = () => {
    const { id } = useParams();
    const [Books, setBooks] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [activeImage, setActiveImage] = useState('');
    const [hoveredImage, setHoveredImage] = useState(null);
    const [count, setCount] = useState(1);
    const [totalAmount, settotalAmount] = useState(0);
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [quantityInBook, setQuantityInBook] = useState(0);
    const [favourite, setFavourite] = useState();
    const currentlyAFavorite = <FontAwesomeIcon icon={faHeart} color="rgb(156, 163, 175)"/>
    const notCurrentlyAFavorite = <FontAwesomeIcon icon={faHeart} color="rgb(255, 66, 79)" />
    const [Carts, setCarts] = useState({ userId: "b68155b3-86f9-4c7f-82d9-5eff5ffe4fad", bookId: id, quantity: 1, selected: false});

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
        const newCount = count + 1;
        setCount(newCount);
        settotalAmount(totalAmount + (Books[0].price || 0));
        setCarts((prev) => ({ ...prev, quantity: newCount }));
    };

    const handleDecrement = () => {
        const newCount = count - 1;
        if (count > 1) {
            setCount(newCount);
            settotalAmount(totalAmount - (Books[0].price || 0))
            setCarts((prev) => ({ ...prev, quantity: newCount }));
        }
    };

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = parseInt(event.target.value, 10) || 1;
        if (name === "quantity" && value <= 1000) {
            if (value > count) {
                settotalAmount(totalAmount + (value - count) * (Books[0].price || 0));
            }
            else if (value < count) {
                settotalAmount(totalAmount - (count - value) * (Books[0].price || 0));
            }
            setCount(value);
        }
        setCarts((prev) => ({ ...prev, [name]: value }));
    };  

    useEffect(() => {
        AxiosClient.get(`/Carts/listCart`).then((res) => {
            const initialBookIdCart = {};
            res.data.forEach((item) => {
                if (item.bookId == id) {
                    setQuantityInCart(item.quantity);
                    initialBookIdCart[item.bookId] = item.bookId;
                }
            });
        })
    }, []);

    useEffect(() => {
        AxiosClient.get(`/Books/detail/${id}`)
            .then(res => {
                const book = res.data
                setBooks([book]);
                settotalAmount(book.price || 0);
                setSelectedImage(`https://localhost:7106/images/${book.images[0].fileName}` || '');
                setQuantityInBook(book.quantity);
                setFavourite(book.favourite);
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    const updateFavourite = async (id, favourite) => {
        try {
            const response = await  AxiosClient.put(`/Books/updateFavourite/${id}`, {
                Id: id,
                Favourite: favourite
            })

        } catch (err) {
            console.error("Error updating the book on the server:", err);
        }
    };

    const handleSubmitCart = (e) => {
        e.preventDefault();
        const totalQuantity = quantityInCart + Carts.quantity;
        if (totalQuantity > quantityInBook) { 
            toast.info(() => (
                <div>Số lượng được mua tối đa của sản phẩm này là {quantityInBook}</div>
            ), {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: false,
                className: "custom-toast",
                toastId: 'custom-toast'
            });
            return;
        }
        AxiosClient.post(`/Carts/createCart`, Carts)
    }

    const handleChangeCart = (e) => {
        setCarts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFavourete = (id) => {
        setFavourite((prevFavourite) => !prevFavourite);
        updateFavourite(id, !favourite)
    };

    useEffect(() => {
        setFavourite(Books.find((item) => item.id == id)?.favourite || false);
    }, [Books, id])

    return (
        <>
            <div style={{ backgroundColor: "#f5f5fa" }}>
                <div className="product_body">
                    <div className="product_main">
                        <Row className="mb-5 mt-4">
                            {
                                Books.map(item => {
                                    return (
                                        <>
                                            <Col sm={3} className="product_image_main">
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
                                                                {item.images.map((img, index) => (
                                                                    <SwiperSlide key={index}>
                                                                        <a
                                                                            className={`image_active ${selectedImage === `https://localhost:7106/images/${img.fileName}` ? 'active' : ''}`}
                                                                            onClick={() => handleImageClick(`https://localhost:7106/images/${img.fileName}`)}
                                                                            onMouseOver={() => handleImageHover(`https://localhost:7106/images/${img.fileName}`)}
                                                                            onMouseLeave={handleImageLeave}
                                                                        >
                                                                            <img
                                                                                src={`https://localhost:7106/images/${img.fileName}`}
                                                                                alt={`Image ${index + 1}`}
                                                                                className="product_image_list"
                                                                            />
                                                                        </a>
                                                                    </SwiperSlide>
                                                                ))}
                                                            </Swiper>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col sm={6} className="product_info">
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
                                                                        <div className="fctQDC"></div>
                                                                        <div className="productDeail-favourite-color">
                                                                            <Button className="btn-productdetail-favourite p-0" onClick={()=>handleFavourete(item.id)}>
                                                                                {favourite ? notCurrentlyAFavorite : currentlyAFavorite}
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col sm={3} className="product_price">
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
                                                        <Form onSubmit={handleSubmitCart}>
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
                                                                                        name="quantity"
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
                                                                    {/* <button className="ijFBvx"> <span>Mua ngay</span></button> */}
                                                                    <Button type="submit" className="btnAddCart">Thêm vào giỏ hàng</Button>
                                                                </div>
                                                            </div>
                                                        </Form>
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
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default ProductDetail;