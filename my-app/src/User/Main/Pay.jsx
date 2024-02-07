import { useEffect, useState } from 'react';
import './Pay.css';
import AxiosClient from '../../Axios/AxiosClient';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Pay = ({ user, phoneValue, addressValue, onChildOpenPay}) => {

    const userId = localStorage.getItem('userId')
    const Address = localStorage.getItem('Address')
    const Phone = localStorage.getItem('Phone')
    const [ShowPay, setShowPay] = useState(false);

    const [User, setUser] = useState({});
    const [PaymentList, setPaymentList] = useState([]);
    const navigate = useNavigate();

    var Discount =0;
    var totalInvoice = 0;
    var Subtotal =0;
    var quantityProduct = 0;

    const handleClosePay =()=> setShowPay(false)

    const handleShowPay =()=> setShowPay(true)

    useEffect(() => {
        AxiosClient.get(`Carts/PaymentList/${userId}`).then(res => {
            setPaymentList(res.data)
        })
    }, [PaymentList]);

    const handlePayment = ()=>{
        AxiosClient.post(`Carts/Pay`,  { ShippingAddress: Address, ShippingPhone: Phone, Total: totalInvoice }).then(() => {
            navigate("/order");
        });
    }

    useEffect(() => {
        AxiosClient.get(`/Users/${userId}`).then(res => {
            setUser(res.data)
        })
    }, [userId]);

  return (<>
    <div  style={{background:"rgb(245, 245, 250)", padding:"2rem 0"}}>
        <div>
            <div style={{ display:"flex", justifyContent:"center"}}>
                
                            <div className="bVA-DDf" >
                            <h3 className='dMMxLl'>Chọn hình thức giao hàng</h3>
                            {PaymentList.map((item, index)=>{                             
                                  Subtotal = Subtotal + (item.price*item.quantity)
                                  Discount = Discount + item.promotionPercentage;
                                  totalInvoice = Subtotal - Discount;
                                  quantityProduct += 1;
                                 return(
                                    <>
                                    <div className="fyhLrw">
                                        <div style={{width:"10%"}}>
                                            <div><img src={`https://localhost:7106/Images/${item.images}`} alt="" /></div>                              
                                        </div>
                                        <div style={{width:"80%"}}>
                                            <div>{item.bookName}</div>
                                            <div>{item.quantity}</div>
                                        </div>
                                        <div>
                                            <div>{item.promotionPercentage.toLocaleString("en-US").replace(/,/g, ".")} ₫</div>
                                            <div>{item.price.toLocaleString("en-US").replace(/,/g, ".")} ₫</div>
                                        </div>          
                                    </div>
                                    </>
                                 )
                            })}
                        </div>
                <div className='bVA-DDf1' style={{background:"rgb(245, 245, 250)"}}>
                    <div className="bVA-DDf1-item">
                        <div className='bVA-DDf1-item-1'>
                            <div className='block-header'>
                                <div className='block-header__title'>Giao tới</div>
                                <Link to='/shipping' >Thay đổi</Link>
                            </div>
                            <div className='customer_info'>
                                <p className='customer_info__name'>{User.fullName}</p>
                                <i></i>
                                <div className='customer_info__phone'>{Phone}</div>
                            </div>
                            <div className='address'>
                                <span className='address__type address__type--home'>Địa chỉ</span>
                                {Address}
                            </div>               
                        </div>
                    </div>

                    <div className="bVA-DDf1-item">             
                            <div className="bVA-DDf1-item-1">
                                <h4>Đơn hàng</h4>
                                <div>{quantityProduct} sản phẩm</div>
                            </div>
                            <hr style={{margin:"0"}}/>
                            <div className="bVA-DDf1-item-1">                                                        
                                    <div className='subtotal'>
                                        <div>Tạm tính: {Subtotal.toLocaleString("en-US").replace(/,/g, ".")} ₫</div>
                                    </div>
                                    <div className='discount'>
                                        <div>Khuyến mãi: {Discount.toLocaleString("en-US").replace(/,/g, ".")} ₫</div>
                                    </div>
                                    <hr />
                                    <div className='order-total' style={{marginBottom:"2rem"}}>
                                        <div >Tổng tiền: {totalInvoice.toLocaleString("en-US").replace(/,/g, ".")} ₫</div>
                                    </div>
                                    <div className='bSkntM'>
                                        <button className="hHWBHK hksmFU" onClick={handleShowPay}>Đặt hàng</button>  
                                    </div>
                                                          
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal show={ShowPay} onHide={handleClosePay}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đặt hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn đặt đơn hàng này</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handlePayment}>
            <FontAwesomeIcon icon={faCheck} /> Đồng ý
          </Button>
          <Button variant="secondary" onClick={handleClosePay}>
            <FontAwesomeIcon icon={faTimes} /> Hủy
          </Button>
        </Modal.Footer>
      </Modal>
  </>)
};
export default Pay;
