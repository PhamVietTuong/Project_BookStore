import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard";
import Layout from "../Admin/Layout";
import ProductAdd from "../Admin/Product/ProductAdd";
import ProductList from "../Admin/Product/ProductList";
import ProductEdit from "../Admin/Product/ProductEdit";
import AccountList from "../Admin/Account/AccountList";
import Register from "../Login/Register";
import CategoryList from "../Admin/Categories/CategoryList";
import CategoryCreate from "../Admin/Categories/CategoryCreate";
import CategoryEdit from "../Admin/Categories/CategoryEdit";
import Index from "../Admin/Index";

const Router = () => { 
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" >
                        <Route index element={<Login />} />
                        {/* <Route path="dashboard" element={<Dashboard />} /> */}
                    </Route>

                    <Route>
                        <Route path="admin" element={<Index />} exact>
                            <Route path="products" element={<ProductList/>} />
                            <Route path="products/add" element={<ProductAdd/>}/>
                            <Route path="products/edit/:id" element={<ProductEdit/>}/>
                            <Route path="accounts" element={<AccountList />} />
                            
                            <Route path="category" element={<CategoryList />} />
                            <Route path="category/add" element={<CategoryCreate />} />
                            <Route path="category/edit/:id" element={<CategoryEdit />} />
                        </Route>
                    </Route> 
                    <Route path="register" >
                        <Route index element={<Register/>} />
                    </Route>

                    <Route path="dashboard" >
                        <Route index element={<Dashboard />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router