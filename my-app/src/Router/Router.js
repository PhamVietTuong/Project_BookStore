import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard";
import ProductAdd from "../Admin/Product/ProductAdd";
import ProductList from "../Admin/Product/ProductList";
import ProductEdit from "../Admin/Product/ProductEdit";
import AccountList from "../Admin/Account/AccountList";
import Register from "../Login/Register";
import CategoryList from "../Admin/Categories/CategoryList";
import CategoryCreate from "../Admin/Categories/CategoryCreate";
import CategoryEdit from "../Admin/Categories/CategoryEdit";
import Index from "../Admin/Index";
import SlideshowList from "../Admin/Slideshow/SlideshowList";
import IndexUser from "../User/IndexUser";
import InfoUser from "../User/Account/InfoUser";
import Main from "../User/Main";
import AccountAdd from "../Admin/Account/AccountAdd";
import ProductDetail from "../User/Main/ProductDetail";
import Cart from "../User/Main/Cart";
import CommentList from "../Admin/Comment/CommentList";
import { useEffect, useState } from "react";
import AxiosClient from "../Axios/AxiosClient";
import ModalLogin from "../User/ModalLogin";
import InvoiceDetails from "../User/Account/InvoiceDetails";
import Unauthorize from "../Unauthorized";
import OrderList from "../Admin/Order/OrderList";
import BarChart from "../Admin/Chart/BarChart";
import ImagesAdd from "../Admin/Images/ImagesAdd";
import Pay from "../User/Main/Pay";
import Shipping from "../User/Main/Shipping";
import ChangePassword from "../User/Account/ChangePassword";
import UserEdit from "../Admin/User/UserEdit";
import EditUser from "../User/Account/EditUser";

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="admin" element={<Index />} exact>
                            <Route path="products" element={<ProductList />} />
                            <Route path="products/add" element={<ProductAdd />} />
                            <Route path="products/edit/:id" element={<ProductEdit />} />

                            <Route path="accounts" element={<AccountList />} />
                            <Route path="accounts/add" element={<AccountAdd />} />

                            <Route path="category" element={<CategoryList />} />
                            <Route path="category/add" element={<CategoryCreate />} />
                            <Route path="category/edit/:id" element={<CategoryEdit />} />

                            <Route path="slideshow" element={<SlideshowList />} />

                            <Route path="comments" element={<CommentList />} />
                            <Route path="orders" element={<OrderList />} />
                            <Route path="statistical" element={<BarChart />} />
                            <Route path="orders" element={<OrderList/>} />
                            <Route path="images" element={<ImagesAdd/>} />
                        </Route>
                    </Route>
                    
                    <Route>
                        <Route path="/" element={<IndexUser />} exact>
                            <Route index path="" element={<Main />} />
                            <Route path="order" element={<InfoUser />} />

                            <Route path="info" element={<InfoUser />} >
                                <Route path="" element={<EditUser />} >
                                    <Route index path="" element={<UserEdit />} />
                                    <Route path="changePassword" element={<ChangePassword />} />
                                </Route>
                            </Route>

                            <Route path="favourite" element={<InfoUser />} />
                            <Route path="detail/:id" element={<ProductDetail />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="order/invoice/detail/:id" element={<InvoiceDetails />} />
                            <Route path="pay" element={<Pay />} /> 
                            <Route path="shipping" element={<Shipping />} />
                        </Route>
                    </Route>

                    <Route path="unauthorized" >
                        <Route index element={<Unauthorize />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router