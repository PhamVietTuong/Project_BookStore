import BestProduct from "./Main/BestProduct";
import Footer from "./Footer";
import Header from "./Header";
import Slide from "./Main/Slide";
import Product from "./Main/Product";
import ProductLove from "./Main/ProductLove";
import Main from "./Main";
import { Outlet } from "react-router-dom";

const IndexUser = () => {
    return (
        <>
            <div className="app">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default IndexUser;