import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";

const FavouritesProducts = ({ item, bookId }) => {
  const accessToken = localStorage.getItem("userId");

  const [favourite, setFavourite] = useState({
    bookId: bookId,
    userId: accessToken,
    status: true,
  });

  const [favoriteChange, setfavoriteChange] = useState(false);
  const [selectedFavorite, setselectedFavorite] = useState({});
  const currentlyAFavorite = (
    <FontAwesomeIcon icon={faHeart} color="rgb(156, 163, 175)" />
  );
  const notCurrentlyAFavorite = (
    <FontAwesomeIcon icon={faHeart} color="rgb(255, 66, 79)" />
  );

  const handleThemFavourite = () => {
    AxiosClient.post(`Favourites`, favourite)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi thêm mục yêu thích", error);
      });
  };

  const handleFavourete = () => {
    setfavoriteChange((prevFavourite) => !prevFavourite);
    if (favoriteChange == false) {
      handleThemFavourite();
      alert("Đã thêm vào yêu thích!");
    } else {
      handleThemFavourite();
      alert("Đã bỏ yêu thích!");
    }
  };

  useEffect(() => {
    AxiosClient.get(`Favourites/${accessToken}/${bookId}`)
      .then((res) => {
        if (res.data) {
          setselectedFavorite(res.data);
          setfavoriteChange(true);
        } else {
          setselectedFavorite(null);
          setfavoriteChange(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [ShowDescription, setShowDescription] = useState(false);
  const handleShowDescription = () => {
    setShowDescription((prevState) => !prevState);
  };

  var divStyle = {};
  var divGradient = {};
  if (ShowDescription == false) {
    divStyle = {
      marginTop: "5px",
      lineHeight: "21px",
      wordBreak: "break-word",
      maxHeight: "100px",
    };

    divGradient = {
      position:"absolute",
      bottom:0,
      left:0,
      width:"100%",
      height:"200px",
      backgroundImage: "linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255))"


    };
  } else {
    divStyle = {
      marginTop: "5px",
      lineHeight: "21px",
      wordBreak: "break-word",
      maxHeight: "700px",
    };
  }

  return (
    <>
      <Col sm={6} className="product_info">
        <div
          className="product_info_heder_body"
          style={{ gap: "16px", padding: 0, background: "rgb(245, 245, 250)" }}
        >
          <div
            className="product_info_body"
            style={{ padding: "16px", background: "white", borderRadius:"0.5rem" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <div className="product_info_star_bookName">
                <div className="product_info_header_main">
                  <span className="brand-and-author no-after">
                    <h6>Tác giả: {item.authorName}</h6>
                  </span>
                </div>

                <h1 className="product_info_bookName">{item.name}</h1>

                <div className="jzQKwa">
                  <div style={{ display: "flex" }}>
                    <div className="dXPbue">
                      <div
                        style={{
                          marginRight: "4px",
                          fontSize: "14px",
                          lineHeight: "150%",
                          fontWeight: "500",
                          marginTop: "3.1px",
                        }}
                      >
                        {item.star.toFixed(1)}
                      </div>
                      <Rating defaultValue={item.star} readOnly />
                      <a className="number">(2003111)</a>
                      <div className="fctQDC"></div>
                    </div>
                    <div className="bExXAB">
                      {" "}
                      Đã bán {item.quantitySold || 0}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <div className="jFWyKZ">
                  <div className="product-price">
                    <div className="product-price__current-price">
                      {item.price.toLocaleString("en-US").replace(/,/g, ".")}
                      <sup>₫</sup>
                    </div>
                    <div className="product-price__discount-rate">
                      -{item.promotionPercentage || 0}%
                    </div>
                    <div className="fctQDC"></div>
                    <div className="productDeail-favourite-color">
                      <Button
                        className="btn-productdetail-favourite p-0"
                        onClick={handleFavourete}
                      >
                        {favoriteChange
                          ? notCurrentlyAFavorite
                          : currentlyAFavorite}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="product_info_body"
            style={{ padding: "16px", background: "white", borderRadius:"0.5rem" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <div className="eaKcuo">Thông tin chi tiết</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="jMQTPW">
                  <div className="eDbeCp">
                    <span
                      style={{ maxWidth: "300px", color: "rgb(128, 128, 137)" }}
                    >
                      Nhà xuất bản
                    </span>
                    <span>{item.publisherName}</span>
                  </div>
                </div>
                <div className="jMQTPW">
                  <div className="eDbeCp">
                    <span
                      style={{ maxWidth: "300px", color: "rgb(128, 128, 137)" }}
                    >
                      Thể loại
                    </span>
                    <span>{item.categoryName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="product_info_body"
            style={{ padding: "16px", background: "white", borderRadius:"0.5rem" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <div className="eaKcuo">Mô tả sản phẩm</div>
              <div className="dGqjau">
                <div className="xbBes">
                  <div className="imwRtb" style={{ overflow: "hidden" }}>
                    <p style={divStyle}>{item.description}</p>
                    <div style={divGradient}></div>
                  </div>
                  <a className="btn-more" onClick={handleShowDescription}>
                    Xem thêm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};
export default FavouritesProducts;
