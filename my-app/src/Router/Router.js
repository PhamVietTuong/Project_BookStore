import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard";
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