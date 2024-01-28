import { useEffect, useState } from 'react';
import './Shipping.css';
import Pay from './Pay';
import AxiosClient from '../../Axios/AxiosClient';
import { Link } from 'react-router-dom';

const Shipping = () => {

    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [tempPhone, setTempPhone] = useState(localStorage.getItem('tempPhone') || '');
    const [tempAddress, setTempAddress] = useState(localStorage.getItem('tempAddress') || '');
    const [OpenEdit, setOpenEdit] = useState(false);
    const [OpenPay, setOpenPay] = useState(false);
    
    const [User, setUser] = useState({});
    const userId = localStorage.getItem('userId')

    const handleEditClick = () => {
        setOpenEdit((prevIndex) => (prevIndex === false ? true : false));
        setTempPhone(localStorage.getItem('Phone') || '');
        setTempAddress(localStorage.getItem('Address') || ''); 

    }

    const handleLinkClick = () => {   
        localStorage.removeItem('tempPhone');
        localStorage.removeItem('tempAddress');
        setOpenEdit(false);    
      };

    const handleChangePhone = (e)=>{
        let value = e.target.value;
        setTempPhone(value)
        localStorage.setItem('tempPhone', value);
    }

    const handleChangeAddress= (e)=>{
        let value = e.target.value;
        setTempAddress(value)
        localStorage.setItem('tempAddress', value);
    }

    const handleUpdate =()=>{
        setPhone(tempPhone);
        setAddress(tempAddress);
        localStorage.setItem('Phone', tempPhone);
        localStorage.setItem('Address', tempAddress);
        setOpenEdit(false);
    }

    useEffect(() => {
        AxiosClient.get(`/Users/${userId}`).then(res => {
            setUser(res.data)
            setAddress(tempAddress || '');
            setPhone(tempPhone || '');
        })
    }, [userId]);


    return ( <>
   {OpenPay==false &&  <div style={{background:"rgb(245, 245, 250)"}}>
        <div className="hfMLFx">
            <div className="jQjVjo">
                <h3 className="title">Nhập thông tin và địa chỉ giao hàng</h3>
                <div className="address-list">
                    <div className="bsrCjS">
                        <p className="name">{User.fullName}</p>
                        <p className="address">{Address}</p>
                        <p className="phone">{Phone}</p>
                        <p className="action">
                            <button className="btn saving-address"><Link to='/pay' style={{color:"rgb(255, 255, 255)"}}>Giao đến địa điểm này</Link></button>
                            <button className='btn edit-address' onClick={handleEditClick}>Sửa</button>
                        </p>
                    </div>
                </div>
                <div className='gpiOgm'></div>

                {OpenEdit && <div className='dtkMQo'>
                    <div className='form-container'>
                        <div className='kSzifj'>
                            <label htmlFor="">Số điện thoại</label>
                            <input type="text" name="shippingPhone" id="" className='girQwT' onChange={handleChangePhone} value={tempPhone}/>
                        </div>
                        <div className='kSzifj'>
                            <label htmlFor="">Địa chỉ</label>
                            <input type="text" name="shippingAddress" id="" className='girQwT' onChange={handleChangeAddress} value={tempAddress}/>
                        </div>

                        <div className='kSzifj'>
                            <label></label>
                            <div className='button-group'>
                                <button className='cancel' onClick={handleLinkClick}>Hủy bỏ</button>
                                <button className='create-update' onClick={()=>{handleUpdate()}}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                
                </div>
                }
            </div>
        </div>
    </div>}
        
    {/* {OpenPay && <Pay user={User.fullName} phoneValue={Phone} addressValue={Address} onChildOpenPay={handleChildInputChange} />} */}
    </> );
}
export default Shipping;