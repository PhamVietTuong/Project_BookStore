import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard";
import Layout from "../Admin/Layout";
import ProductAdd from "../Admin/Product/ProductAdd";
import ProductList from "../Admin/Product/ProductList";
import AccountList from "../Admin/Account/AccountList";
import Register from "../Login/Register";

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
                        <Route path="admin" element={<Layout />} exact>
                            <Route path="products" element={<ProductList/>} />
                            <Route path="products/add" element={<ProductAdd/>}/>

                            <Route path="accounts" element={<AccountList/>} />
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