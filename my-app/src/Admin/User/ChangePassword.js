import { Outlet } from "react-router-dom";
import "./ChangePassword.css"
const ChangePassword = () => {
    return (
        <>
            <div className="jXurFV">
                <div className="geNdhL">Thiết lập mật khẩu</div>
            <div className="cBVmpr">
                <form>
                    <div className="form-control" style={{border:'none'}}>
                        <label className="input-label">Mật khẩu mới</label>
                        <div className="hisWEc" >
                            <input name="password"  type="password" placeholder="Mật khẩu mới"  />
                        </div>
                    </div>
                    <div className="form-control"style={{border:'none'}}>
                        <label className="input-label">Nhập lại mật khẩu mới</label>
                        <div className="hisWEc" >
                            <input  name="password"  type="password" placeholder="Nhập lại mật khẩu mới"  />
                        </div>
                    </div>
                    <button className="cqEaiM">Lưu thay đổi</button>
                </form>
            </div>
            </div>
           {/* <Outlet/> */}
        </>
    );
}

export default ChangePassword;