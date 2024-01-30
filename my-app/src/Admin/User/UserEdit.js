import { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {  NavLink, Outlet, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import ChangePassword from "./ChangePassword";
const UserEdit = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setError] = useState("");
    const [emailError, setEmailError] = useState('');
    const accessToken = localStorage.getItem('userId');
    const [dateString, setDateString] = useState();
    const splitDate = (dateString) => {
        if (dateString) {
            const dateOnly = dateString.split("T")[0];
            const [year, month, day] = dateOnly.split("-");
            return { year, month, day };
        }
        return { year: "", month: "", day: "" };
    };
    const { year, month, day } = splitDate(dateString);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "fullName" && /\d/.test(value)) {
            setEmailError('');
            setError('Vui lòng không nhập ký tự số.');
        } else if (name === "email") {
            const atIndex = value.indexOf('@');
            const domain = atIndex !== -1 ? value.slice(atIndex + 1) : '';

            if (!value.includes('@') || /\d/.test(domain)) {
                setEmailError('Vui lòng nhập địa chỉ email hợp lệ.');
                setError('');
            } else {
                setEmailError('');
                setError('');
                setUser((prev) => ({ ...prev, [name]: value }));
            }
        } else if (name === "birthday") {
            setUser((prev) => ({ ...prev, [name]: value }));
        } else {
            setEmailError('');
            setError('');
            setUser((prev) => ({ ...prev, [name]: value }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosClient.put(`/Users/${accessToken}`, user);
            window.location.reload();
            console.log(user);
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Error updating user. Please try again.");
        }
    }
    useEffect(() => {
        setDateString(user.birthday);
    }, [user.birthday]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await AxiosClient.get(`/Users/${accessToken}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Error fetching user data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    var widthInput = {
        width: "68%",
    };

    if (loading) {
        return <p>Loading...</p>; 
    }
    return (
        <>
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt="Admin"
                                    className="rounded-circle"
                                    width={150}
                                />
                                <div className="mt-3">
                                    <h4 style={{marginTop:'1rem'}}>{user.fullName}</h4>
                                    <NavLink to="/info/change" className="btn btn-outline-primary"style={{marginTop:'3rem'}}>
                                        Đổi mật khẩu 
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-2 d-flex align-items-center">
                                    <h6 className="mb-0">Họ & Tên</h6>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        placeholder="Họ và tên"
                                        value={user?.fullName || ""}
                                        onChange={handleChange}
                                        style={widthInput}
                                    />
                                </div>
                                {errors && <div style={{ color: 'red', marginLeft: '8rem', marginTop: '3px' }}>{errors}</div>}
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-2 d-flex align-items-center">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email" value={user?.email || ""}
                                        onChange={handleChange}
                                        style={widthInput}
                                    />
                                </div>
                                {emailError && <p style={{ color: 'red', marginLeft: '8rem', marginTop: '3px' }}>{emailError}</p>}
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-2 d-flex align-items-center">
                                    <h6 className="mb-0">Ngày sinh</h6>
                                </div>
                                <div className="col-sm-6">
                                    <div className="row" style={{ marginTop: '10px', marginLeft: '2px', width: '68%' }}>
                                        <input
                                            type="date"
                                            name="birthday"
                                            value={`${year || ""}-${month || ""}-${day || ""}`}
                                            onChange={handleChange}
                                            className="form-control"

                                        />
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-sm-2 d-flex align-items-center">
                                    <h6 className="mb-0">Địa chỉ</h6>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="address"
                                        name="address"
                                        className="form-control"
                                        placeholder="Địa chỉ"
                                        value={user?.address || ""}
                                        onChange={handleChange}
                                        style={widthInput}
                                    />
                                </div>
                            </div>
                            <div className=" card-footer mt-2 pl-0">
                                <Button type="submit" variant="warning" onClick={handleSubmit}>
                                    <FontAwesomeIcon icon={faCheck} />Cập nhật thông tin khách hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
           <Outlet/>
        
        </>
    );
}

export default UserEdit;
