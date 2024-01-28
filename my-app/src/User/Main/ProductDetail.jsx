import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";


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
    const currentlyAFavorite = <FontAwesomeIcon icon={faHeart} color="rgb(156, 163, 175)" />
    const notCurrentlyAFavorite = <FontAwesomeIcon icon={faHeart} color="rgb(255, 66, 79)" />
    const [Carts, setCarts] = useState({bookId: id, quantity: 1, selected: false });
    const [review, setReview] = useState([]);
    const [contentComment, setContentComment] = useState('');
    const [timeComment, setTimeComment] = useState(0);
    const navigate  = useNavigate()
    //Handle hover image
    const handleImageClick = (newImage) => {
        setSelectedImage(newImage);
        setActiveImage(newImage);
    };

    const handleImageHover = (hoverImage) => { setHoveredImage(hoverImage); };

    const handleImageLeave = () => { setHoveredImage(null); };

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
            const response = await AxiosClient.put(`/Books/updateFavourite/${id}`, {
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

    const handleChangeCart = (e) => { setCarts((prev) => ({ ...prev, [e.target.name]: e.target.value })); };

    const handleFavourete = (id) => {
        setFavourite((prevFavourite) => !prevFavourite);
        updateFavourite(id, !favourite)
    };

    useEffect(() => { setFavourite(Books.find((item) => item.id == id)?.favourite || false); }, [Books, id])


    const calculatorTime = (seconds) => {
        console.log(seconds);
        if (seconds < 60) {
            return `${Math.floor(seconds)} giây`
        }
        else if (seconds < 3600) {
            return `${Math.floor(seconds/60)} phút`
        }
        else if (seconds < 86400) {
            return `${Math.floor(seconds/3600)} giờ`
        }
        else if (seconds < 2592000) {
            return `${Math.floor(seconds / 86400)} ngày`
        }
        else if (seconds < 31536000) {
            return `${Math.floor(seconds / 2592000)} tháng`
        }
        else {
            return `${Math.floor(seconds / 31536000)} năm`
        }
    }

    useEffect(() => {
        try {
            AxiosClient.get(`/Reviews/listReview`, {
                params: {
                    Bookid: id
                }
            }).then(res => {
                setReview(res.data)
            })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleComment = () => {

    }

    const handleOnChangeComment = (e) => {
        setContentComment(e.target.value)
    }

    const handleButtonClick = () => {
        //window.location.href = '/pay';
        const address = localStorage.getItem('Address')
        const phone = localStorage.getItem('Phone')

        if(address==null && phone==null)
        {
            navigate("/shipping")      

        }
        else{
            navigate("/pay")      
        }
      };

    return (
        <>
            <div style={{ backgroundColor: "#f5f5fa" }}>
                {
                    Books.map(item => {
                        return (
                            <>
                                <div className="product_body">
                                    <div className="product_main">
                                        <Row className="mb-5 mt-4">

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
                                                                                {item.star.toFixed(1)}
                                                                            </div>
                                                                            <Rating defaultValue={item.star} readOnly />
                                                                            <a className="number">(2003111)</a>
                                                                            <div className="fctQDC"></div>
                                                                        </div>
                                                                        <div className="bExXAB"> Đã bán {item.quantitySold || 0} </div>
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
                                                                            -{item.promotionPercentage || 0}%

                                                                        </div>
                                                                        <div className="fctQDC"></div>
                                                                        <div className="productDeail-favourite-color">
                                                                            <Button className="btn-productdetail-favourite p-0" onClick={() => handleFavourete(item.id)}>
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
                                                                    {/* <Link
                                                                        onClick={handleButtonClick}
                                                                        className="ijFBvx"          
                                                                    >  
                                                                             <span>Mua ngay</span>                                                                                                                                     
                                                                    </Link> */}
                                                                    <button  className="ijFBvx"  onClick={(e)=> {handleButtonClick(); handleSubmitCart(e)}}><span>Mua ngay</span>  </button>

                                                                    {/* <button className="ijFBvx" > <span>Mua ngay</span></button> */}
                                                                    <Button type="submit" className="btnAddCart" onClick={handleSubmitCart}>Thêm vào giỏ hàng</Button>
                                                                </div>
                                                            </div>
                                                       
                                                    </div>
                                                </div>
                                            </Col>


                                        </Row>

                                        <div className="iHMNqO">
                                            <div className="eaKcuo">Khách hàng đánh giá</div>
                                            <div className="yZKrw">
                                                <div className="customer-reviews__inner">
                                                    <div className="customer-reviews__top">
                                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", width: "100%", paddingBottom: "16px" }}>
                                                            <div className="fvFoxk">
                                                                <div className="review-rating__heading">
                                                                    Tổng quan
                                                                </div>
                                                                <div className="review-rating__inner">
                                                                    <div className="review-rating__summary">
                                                                        <div className="review-rating__point">
                                                                            {item.star.toFixed(1)}
                                                                        </div>
                                                                        <div className="review-rating__stars">
                                                                            <Rating defaultValue={item.star} readOnly />
                                                                        </div>
                                                                    </div>
                                                                    <div className="review-rating__total">({item.totalRating} đánh giá)</div>
                                                                    <div className="review-rating__detail">
                                                                        <div className="review-rating__level">
                                                                            <Rating defaultValue={5} readOnly />
                                                                            <div className="bBKTyc">
                                                                                <div style={{ width: `${(item.fiveStar / item.totalRating) * 100}%` }}></div>
                                                                            </div>
                                                                            <div className="review-rating__number">{item.fiveStar}</div>
                                                                        </div>

                                                                        <div className="review-rating__level">
                                                                            <Rating defaultValue={4} readOnly />
                                                                            <div className="bBKTyc">
                                                                                <div style={{ width: `${(item.fourStar / item.totalRating) * 100}%` }}></div>

                                                                            </div>
                                                                            <div className="review-rating__number">{item.fourStar}</div>
                                                                        </div>

                                                                        <div className="review-rating__level">
                                                                            <Rating defaultValue={3} readOnly />
                                                                            <div className="bBKTyc">
                                                                                <div style={{ width: `${(item.threeStar / item.totalRating) * 100}%` }}></div>

                                                                            </div>
                                                                            <div className="review-rating__number">{item.threeStar}</div>
                                                                        </div>

                                                                        <div className="review-rating__level">
                                                                            <Rating defaultValue={2} readOnly />
                                                                            <div className="bBKTyc">
                                                                                <div style={{ width: `${(item.twoStar / item.totalRating) * 100}%` }}></div>

                                                                            </div>
                                                                            <div className="review-rating__number">{item.twoStar}</div>
                                                                        </div>

                                                                        <div className="review-rating__level">
                                                                            <Rating defaultValue={1} readOnly />
                                                                            <div className="bBKTyc">
                                                                                <div style={{ width: `${(item.oneStar / item.totalRating) * 100}%` }}></div>
                                                                            </div>
                                                                            <div className="review-rating__number">{item.oneStar}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="AgEvk">
                                                        <div className="filter-review__label">Lọc theo</div>
                                                        <div class="filter-review__inner">
                                                            <div class="filter-review__item">
                                                                <span class="filter-review__check">
                                                                    <img src="https://salt.tikicdn.com/ts/upload/68/59/32/9589577c7e094d3dccbe57dd0af2bbb8.png" />
                                                                </span>
                                                                <span class="filter-review__text">Mới nhất</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        review.map(item => {
                                                            return (
                                                                <>
                                                                    <div className="jSHEVq review-comment">
                                                                        <div className="review-comment__user">
                                                                            <div className="review-comment__user-inner">
                                                                                <div className="review-comment__user-avatar">
                                                                                    <div
                                                                                        className="oGSEO has-character"
                                                                                        style={{
                                                                                            backgroundImage: 'url("%2F%2Ftiki.vn%2Fassets%2Fimg%2Favatar.png")'
                                                                                        }}
                                                                                    >
                                                                                        <img src="//tiki.vn/assets/img/avatar.png" alt="Nga PT" />
                                                                                        <span>NP</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <div className="review-comment__user-name">{item.fullName}</div>
                                                                                    <div className="review-comment__user-date">Đã tham gia 3 năm</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="review-comment__user-info">
                                                                                <div>
                                                                                    <img
                                                                                        src="https://salt.tikicdn.com/ts/upload/c6/67/f1/444fc9e1869b5d4398cdec3682af7f14.png"
                                                                                        alt="review-count"
                                                                                    />
                                                                                    Đã viết
                                                                                </div>
                                                                                <span>9 Đánh giá</span>
                                                                            </div>
                                                                            <div style={{ border: "0.5px solid rgb(235, 235, 240)", marginTop: 9 }} />
                                                                            <div className="review-comment__user-info">
                                                                                <div>
                                                                                    <img
                                                                                        src="https://salt.tikicdn.com/ts/upload/cc/86/cd/1d5ac6d4e00abbf6aa4e4636489c9d80.png"
                                                                                        alt="liked-count"
                                                                                    />
                                                                                    Đã nhận
                                                                                </div>
                                                                                <span>6 Lượt cảm ơn</span>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ flexGrow: 1 }}>
                                                                            <div className="review-comment__rating-title">
                                                                                <div
                                                                                    className="jUynBq review-comment__rating"
                                                                                    style={{ whiteSpace: "nowrap" }}
                                                                                >
                                                                                    <Rating defaultValue={item.rating} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="review-comment__seller-name-attributes">
                                                                                <div className="review-comment__seller-name">
                                                                                    <span className="review-comment__check-icon" />
                                                                                    Đã mua hàng
                                                                                </div>
                                                                            </div>
                                                                            <div className="review-comment__content">
                                                                                {item.content.charAt(0).toUpperCase() + item.content.slice(1)}

                                                                            </div>
                                                                            <div className="review-comment__images">
                                                                                <div
                                                                                    data-view-id="pdp_product_review_view_photo"
                                                                                    className="review-comment__image"
                                                                                    style={{
                                                                                        backgroundImage:
                                                                                            'url("https://salt.tikicdn.com/cache/w280/ts/review/54/79/4a/934cb12745e580aacf5551d0023dbfcf.jpg")'
                                                                                    }}
                                                                                />
                                                                                <div
                                                                                    data-view-id="pdp_product_review_view_photo"
                                                                                    className="review-comment__image"
                                                                                    style={{
                                                                                        backgroundImage:
                                                                                            'url("https://salt.tikicdn.com/cache/w280/ts/review/2f/f9/d6/7ac2ffd66553bb8c691bb54bc7f3774f.jpg")'
                                                                                    }}
                                                                                />
                                                                                <div
                                                                                    data-view-id="pdp_product_review_view_photo"
                                                                                    className="review-comment__image"
                                                                                    style={{
                                                                                        backgroundImage:
                                                                                            'url("https://salt.tikicdn.com/cache/w280/ts/review/d5/71/d2/134c2fb847f56d869445766c44317830.jpg")'
                                                                                    }}
                                                                                />
                                                                                <div
                                                                                    data-view-id="pdp_product_review_view_photo"
                                                                                    className="review-comment__image"
                                                                                    style={{
                                                                                        backgroundImage:
                                                                                            'url("https://salt.tikicdn.com/cache/w280/ts/review/5b/14/b2/c92bcb4d58de529a6474082891b04140.jpg")'
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="review-comment__created-date">
                                                                                <span>Đánh giá vào {calculatorTime(item.createTime)} trước</span>
                                                                            </div>
                                                                            <div
                                                                                style={{
                                                                                    display: "flex",
                                                                                    justifyContent: "space-between",
                                                                                    alignItems: "center"
                                                                                }}
                                                                            >
                                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                                    <span
                                                                                        data-view-id="pdp_product_review_like_buton"
                                                                                        className="review-comment__thank "
                                                                                    >
                                                                                        <img
                                                                                            src="https://salt.tikicdn.com/ts/upload/10/9f/8b/54e5f6b084fb9e3445036b4646bc48b5.png"
                                                                                            width={24}
                                                                                            height={24}
                                                                                        />
                                                                                        <span>6</span>
                                                                                    </span>
                                                                                    <span
                                                                                        data-view-id="pdp_product_review_reply_button"
                                                                                        className="review-comment__reply"
                                                                                    >
                                                                                        <img
                                                                                            src="https://salt.tikicdn.com/ts/upload/82/f0/7f/7353641630f811453e875bb5450065d8.png"
                                                                                            width={24}
                                                                                            height={24}
                                                                                        />
                                                                                        Bình luận
                                                                                    </span>
                                                                                </div>
                                                                                <span
                                                                                    data-view-id="pdp_product_review_reply_button"
                                                                                    className="review-comment__reply"
                                                                                >
                                                                                    <img
                                                                                        src="https://salt.tikicdn.com/ts/upload/3f/fa/d4/7057dfb58b682b1b0a2b9683228863ee.png"
                                                                                        width={24}
                                                                                        height={24}
                                                                                    />
                                                                                    Chia sẻ
                                                                                </span>
                                                                            </div>
                                                                            <div className="jZgcAK reply-comment">
                                                                                <div className="reply-comment__outer">
                                                                                    <div
                                                                                        className="reply-comment__avatar"
                                                                                        style={{ backgroundImage: 'url("//tiki.vn/assets/img/avatar-s.png")' }}
                                                                                    >
                                                                                        <img
                                                                                            src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                                                                                            alt=""
                                                                                        />
                                                                                    </div>
                                                                                    <div className="reply-comment__wrapper">
                                                                                        <InputGroup className="mb-3">
                                                                                            <Form.Control
                                                                                                className="iOuAHt"
                                                                                                placeholder="Viết câu trả lời"
                                                                                                value={contentComment}
                                                                                                onChange={handleOnChangeComment}
                                                                                            >
                                                                                            </Form.Control>
                                                                                            <Button variant="outline-secondary" id="button-addon2" onClick={{ handleComment }}>
                                                                                                <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                                                                                            </Button>
                                                                                        </InputGroup>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </>
                        )
                    })
                }

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