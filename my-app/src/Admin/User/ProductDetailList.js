import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { Col, Row } from "react-bootstrap";
import { Rating } from "@mui/material";
import "./ProductDetailList.css";
import { Link, useParams } from "react-router-dom";

const ProductDetailList = () => {
    const {id} = useParams();
    const [favoriteProduct, setFavoriteProduct] = useState([]);
    useEffect(() => {
        AxiosClient.get(`/Favourites/listFavorite/`)
            .then((res) => {
                setFavoriteProduct(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.error('Error fetching favorite products:', error);
            });
    }, []);
    return (
        <div>
            <Row>
                {favoriteProduct.map((item) => (
                    <Col sm={6} key={item.id} className="product-info">
                        <div className="product-info-header-body" style={{ gap: "16px" }}>
                            <div className="product-info-body">
                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                    <div className="product-info-star-book-name">
                                        <div className="product-info-header-main">
                                            <span className="brand-and-author no-after">
                                                <h6>{item.title}</h6>
                                            </span>
                                        </div>
                                        <div className="jzQKwa">
                                            <div style={{ display: "flex" }}>
                                                <div className="dXPbue">
                                                    <div style={{ marginRight: "4px", fontSize: "14px", lineHeight: "150%", fontWeight: "500", marginTop: "3.1px" }}>
                                                        {item.start.toFixed(1)}
                                                    </div>
                                                    <Rating defaultValue={item.start} readOnly />
                                                    <a className="number">(2003111)</a>
                                                    <div className="fctQDC"></div>
                                                </div>
                                                <div className="bExXAB"></div>
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
                                                <div className="product-price__discount-rate ">
                                                    {item.promotion}%
                                                </div>
                                                <div className="fctQDC"></div>
                                                <div className="productDeail-favourite-color"></div>
                                            </div>
                                            <div className="product-description mt-4">
                                               
                                                <Link to={`/detail/${item.bookId}`}> <img src={`https://localhost:7106/images/${item.imageName}`} style={{ width: "70%" }} /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
export default ProductDetailList;
