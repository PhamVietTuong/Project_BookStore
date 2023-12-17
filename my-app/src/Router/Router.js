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

const Router = () => { 
    return (    
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" >
                        <Route index element={<Login />} />
                    </Route>
                    <Route>
                        <Route path="admin" element={<Index />} exact>
                            <Route path="products" element={<ProductList/>} />
                            <Route path="products/add" element={<ProductAdd/>}/>
                            <Route path="products/edit/:id" element={<ProductEdit/>}/>

                            <Route path="accounts" element={<AccountList />} />
                            <Route path="accounts/add" element={<AccountAdd/>}/>
                            
                            <Route path="category" element={<CategoryList />} />
                            <Route path="category/add" element={<CategoryCreate />} />
                            <Route path="category/edit/:id" element={<CategoryEdit />} />

                            <Route path="slideshow" element={<SlideshowList />} />
                        </Route>
                    </Route> 
                    <Route path="register" >
                        <Route index element={<Register/>} />
                    </Route>

                    <Route path="dashboard" >
                        <Route index element={<Dashboard />} />
                    </Route>

                    <Route>
                        <Route path="/" element={<IndexUser />} exact>
                            <Route index path="" element={<Main/>} />
                            <Route path="order" element={<InfoUser />} />
                            <Route path="info" element={<InfoUser />} />
                            <Route path="detail/:id" element={<ProductDetail />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router