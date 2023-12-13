import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";

const Slide = () => {
    const [Slideshows, setSlideshows] = useState([]);

    useEffect(() => {
        AxiosClient.get(`/Slideshows`).then((res) => { setSlideshows(res.data); })
    }, []);

    return (
        <>
            <section className="menu-slide">
                <div className="container">
                    <div className="row">
                        <nav className="menu__nav col-lg-3 col-md-12 col-sm-0">
                            <ul className="menu__list">
                                <li className="menu__item menu__item--active">
                                    <a href="#" className="menu__link">
                                        <img src="images1/item/baby-boy.png" alt="" className="menu__item-icon" id="Capa_1"
                                            enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512"
                                            width="512" />
                                        Sách Tiếng Việt</a>
                                </li>
                                <li className="menu__item">
                                    <a href="#" className="menu__link">
                                        <img src="images1/item/translation.png" alt="" className="menu__item-icon" id="Capa_1"
                                            enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512"
                                            width="512" />
                                        Sách nước ngoài</a>
                                </li>

                                <li className="menu__item">
                                    <a href="#" className="menu__link">
                                        <img src="images1/item/1380754_batman_comic_hero_superhero_icon.png" alt=""
                                            className="menu__item-icon" viewBox="0 0 512 512" width="1012" height="512" />

                                        Manga - Comic</a>
                                </li>

                            </ul>
                        </nav>

                        <div className="slider col-lg-9 col-md-12 col-sm-0 mt-4">
                            <div className="row">
                                <div className="slide__left col-lg-8 col-md-0 col-sm-0">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel"
                                        data-interval="3000">
                                        <div className="carousel-inner">
                                            {
                                                Slideshows.map((item, index) => {
                                                    return (
                                                        <div key={index} className={`carousel-item ${index == 0 ? 'active' : ''}`}>
                                                            <img src={`https://localhost:7106/images/${item.name}`} className="d-block w-100"
                                                                alt="Slideshow" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                                            data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                                            data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                    <div className="slide__left-bottom ">
                                        <div className="slide__left-botom-one">
                                            <img src="images1/banner/363107_05.jpg" className="slide__left-bottom-one-img" />
                                        </div>
                                        <div className="slide__left-bottom-two">
                                            <img src="images1/banner/363104_06.jpg" className="slide__left-bottom-tow-img" />
                                        </div>
                                    </div>
                                </div>

                                <div className="slide__right col-lg-4 col-md-0 col-sm-0 ml-2">
                                    <img src="images1/banner/slider-right.png" className="slide__right-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Slide;