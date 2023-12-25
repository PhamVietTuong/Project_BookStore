import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { Link } from "react-router-dom";

export default function Product() {
    const [Products, setProducts] = useState([]);
    const [Images, setImages] = useState();

    useEffect(() => {
        AxiosClient.get(`/Books/listBook`)
            .then((res) => {
                setProducts(res.data);
            });
    }, []);

    return (
        <>
            <section className="product">
                <div className="container">
                    <div className="row">
                        <aside className="product__sidebar col-lg-3 col-md-0 col-sm-12">
                            <div className="product__sidebar-heading">
                                <div className=""></div>
                                <h2 className="product__sidebar-title">
                                    <img src="images1/item/1380754_batman_comic_hero_superhero_icon.png" alt=""
                                        className="menu__item-icon" id="Capa_1" enable-background="new 0 0 512 512" height="512"
                                        viewBox="0 0 512 512" width="512" />
                                    Manga - Comic
                                </h2>
                            </div>

                            <nav className="product__sidebar-list">

                                <div className="row">
                                    <div className="product__sidebar-item col-lg-6">
                                        <img src="images1/product/【グラブル】「炭治郎&禰豆子&善逸&伊之助」の評価_性能検証｜鬼滅コラボ【グランブルーファンタジー】 - ゲームウィズ(GameWith).jfif"
                                            alt="" className="product__sidebar-item-img" />
                                        <a href="" className="product__sidebar-item-name">Manga</a>
                                    </div>
                                    <div className="product__sidebar-item col-lg-6">
                                        <img src="images1/product/My Anime For Life.jfif" className="product__sidebar-item-img" />
                                        <a href="" className="product__sidebar-item-name">Series Manga</a>
                                    </div>
                                    <div className="product__sidebar-item col-lg-6">
                                        <img src="images1/product/twd2_biaao_demo.jpg" alt=""
                                            className="product__sidebar-item-img" />
                                        <a href="" className="product__sidebar-item-name">Comics</a>
                                    </div>
                                    <div className="product__sidebar-item col-lg-6">
                                        <img src="images1/product/8936054081882.jpg" alt=""
                                            className="product__sidebar-item-img" />
                                        <a href="" className="product__sidebar-item-name">Truyện tranh Việt Nam</a>
                                    </div>
                                </div>
                            </nav>

                            <div className="product__sidebar-img-wrap">
                                <video width="255" height="300" controls>
                                    <source src="video/contra.st_1629123780_musicaldown.com.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </aside>

                        <article className="product__content col-lg-9 col-md-12 col-sm-12">
                            <nav className="row">
                                <ul className="product__list hide-on-mobile">
                                    <li className="product__item product__item--active">
                                        <a href="#" className="product__link">Hành động - Phiêu lưu</a>
                                    </li>
                                    <li className="product__item">
                                        <a href="#" className="product__link">Bí ẩn - Siêu nhiên</a>
                                    </li>
                                    <li className="product__item">
                                        <a href="#" className="product__link">Giả tưởng - Khoa học</a>
                                    </li>
                                    <li className="product__item">
                                        <a href="#" className="product__link">Lãng mạn - Hài kịch</a>
                                    </li>
                                </ul>

                                <div className="product__title-mobile">
                                    <h2>Hành động - Phiêu lưu</h2>
                                </div>
                            </nav>

                            <div className="row product__panel">
                                {
                                    Products.map(item => {
                                        return (
                                            <>
                                                    <div className="product__panel-item col-lg-3 col-md-4 col-sm-6">
                                                    <Link to={`detail/${item.id}`} className="card card-hover">
                                                        <div className="product__panel-item-wrap">
                                                            <div className="product__panel-img-wrap">
                                                                <div className="image-wrapper">
                                                                    <img src={`https://localhost:7106/images/${item.fileName}`} alt=""
                                                                        className="product__panel-img" style={{ width: "100%", height: "100%", opacity: "1" }} />
                                                                </div>
                                                            </div>
                                                            <div style={{ height: "188px", minHeight: "158px", display: "flex", flexDirection: "column" }}>
                                                                <div className="product-info">
                                                                    <div className="product-name-star-sold">
                                                                        <h3 className="product__panel-link">
                                                                            {item.name}
                                                                        </h3>
                                                                        <div className="product_star_sold">
                                                                            <div className="product__panel-rate-wrap">
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                                <i className="fas fa-star product__panel-rate"></i>
                                                                            </div>
                                                                            <span className="quantity hasBorder">Đã bán 1000</span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="price-discount has-discount">
                                                                            <div className="price-discount_price">
                                                                                {item.price.toLocaleString("en-US").replace(/,/g, '.')}
                                                                                <sup>₫</sup>
                                                                            </div>

                                                                            <div className="product__panel-price-sale-off">
                                                                                -11%
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
                                                        </div>
                                                </Link>
                                                </div>

                                            </>
                                        )
                                    })
                                }
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}
