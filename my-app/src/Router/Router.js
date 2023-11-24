import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard";

const Router = () => { 
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" >
                        <Route index element={<Login />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router