import { Button, Col, Form, FormControl, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import './Cart.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AxiosClient from '../../Axios/AxiosClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [intoMoney, setIntoMoney] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedCart, setselectedCart] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [promotionPercentage, setPromotionPercentage] = useState(0);
    const [totalDiscountedAmount, setTotalDiscountedAmount] = useState(0);
    const [provisionalAmount, setProvisionalAmount] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    const [maxQuantity, setMaxQuantity] = useState(0);
    const [newQuantity, setNewQuantity] = useState(0);
    const handleCloseDelete = () => setShowDelete(false);
    const navigate = useNavigate();
    useEffect(() => {
        AxiosClient.get(`/Carts/listCart`).then((res) => {
            const initialQuantityState = {};
            const initialTotalAmountState = {};
            const initialPromotion = {};
            const initialMaxQuantity = {};
            res.data.forEach((item) => {
                initialQuantityState[item.id] = item.quantity;
                initialTotalAmountState[item.id] = item.quantity * item.price;
                initialPromotion[item.id] = item.promotionPercentage;
                initialMaxQuantity[item.id] = item.maxQuantity;
            });

            setQuantity(initialQuantityState);
            setIntoMoney(initialTotalAmountState);
            setPromotionPercentage(initialPromotion);
            setMaxQuantity(initialMaxQuantity);
            setCarts(res.data);
        })
    }, []);

    const updateQuantity = async (id, bookId, newQuantity) => {
        try {
            const response = await AxiosClient.put(`/Carts/updateQuantity/${id}`, {
                Id: id,
                BookId: bookId,
                Quantity: newQuantity,
            })
        } catch (error) {
            console.error("Error updating the cart on the server:", error);
        }
    }

    const updateSelected = async (id, selected) => {
        try {
            const response = await AxiosClient.put(`/Carts/updateSelected/${id}`, {
                Id: id,
                Selected: selected,
            })
        } catch (error) {
            console.error("Error updating the cart on the server:", error);
        }
    }

    const showToast = (maxQuantity) => {
        toast.info(() => (
            <div>Số lượng được mua tối đa của sản phẩm này là {maxQuantity}</div>
        ), {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: false,
            className: "custom-toast",
            toastId: 'custom-toast'
        });
    }

    const handleIncrement = (id, price, bookId) => {
        if (quantity[id] + 1 > maxQuantity[id]) {
            showToast(maxQuantity[id]);
            return;
        }

        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [id]: prevQuantity[id] + 1,
        }));

        setIntoMoney((prevTotal) => ({
            ...prevTotal,
            [id]: (prevTotal[id] || 0) + price,
        }));
        setNewQuantity(quantity[id] + 1)
        updateQuantity(id, bookId, quantity[id]+1)
    };

    const handleDecrement = (id, price, bookId) => {
        if (quantity[id] > 1) {
            setQuantity((prevQuantity) => ({
                ...prevQuantity,
                [id]: prevQuantity[id] - 1,
            }));

            setIntoMoney((prevTotal) => ({
                ...prevTotal,
                [id]: (prevTotal[id] || 0) - price,
            }));
            setNewQuantity(quantity[id] - 1)

            updateQuantity(id, bookId, quantity[id] - 1)
        }
    };

    const handleInputChange = (id, price, event, bookId) => {
        const newValue = parseInt(event.target.value, 10) || 1;
        if (newValue > maxQuantity[id]) {
            showToast(maxQuantity[id]);
            return;
        }
        if (newValue > quantity[id]) {
            setIntoMoney((prevTotal) => ({
                ...prevTotal,
                [id]: (prevTotal[id] || 0) + (newValue - quantity[id]) * price,
            }));
        } else if (newValue < quantity[id]) {
            setIntoMoney((prevTotal) => ({
                ...prevTotal,
                [id]: (prevTotal[id] || 0) - (quantity[id] - newValue) * price,
            }));
        }

        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [id]: newValue,
        }));
        setNewQuantity(newValue)
        updateQuantity(id, bookId, newValue);
    };

    const handleShowDelete = (id) => {
        setselectedCart(carts.find(a => a.id == id));
        setShowDelete(true);
    }

    const handleDelete = () => {
        AxiosClient.delete(`/Carts/${selectedCart.id}`);
        let list = carts;
        list.splice(carts.findIndex(a => a.id == selectedCart.id), 1);
        setCarts(list);
        setShowDelete(false);
    }

    const calculateDiscountedAmount = (originalPrice, discountPercentage) => {
        const discountAmount = originalPrice * discountPercentage
        return originalPrice - discountAmount;
    }

    const handleCheckboxChange = (id, bookId, quantity) => {
        let totalDiscountedAmount = 0;
        let initialTotal = 0;
        let provisionalAmount = 0;
        let countProducts = 0;
        let updatedCarts = [];

        if (id) {
            updatedCarts = carts.map((cartItem) =>
                cartItem.id === id ? { ...cartItem, selected: !cartItem.selected } : cartItem
            );
            const selected = updatedCarts.find(item => item.id === id)?.selected
            updateSelected(id, selected)

            updatedCarts.every(item=>item.selected) ? setSelectAllChecked(true) : setSelectAllChecked(false);

            updatedCarts.forEach((item) => {
                if (item.selected) {
                    const originalPrice = intoMoney[item.id];
                    const discountPercentage = ((100 - promotionPercentage[item.id]) / 100 || 0);
                    const discountedAmount = calculateDiscountedAmount(originalPrice, discountPercentage);

                    provisionalAmount += originalPrice;
                    totalDiscountedAmount += discountedAmount;
                    initialTotal += originalPrice * discountPercentage || 0;
                }
            });
            countProducts = updatedCarts.filter((item) => item.selected).length;
        } else {
            updatedCarts = carts.map((item) => ({
                ...item,
                selected: !selectAllChecked
            }))

            updatedCarts.forEach(item => {
                updateSelected(item.id, item.selected)
            })

            if (!selectAllChecked) {
                carts.forEach((item) => {
                    const originalPrice = intoMoney[item.id];
                    const discountPercentage = ((100 - promotionPercentage[item.id]) / 100 || 0);
                    const discountedAmount = calculateDiscountedAmount(originalPrice, discountPercentage);

                    totalDiscountedAmount += discountedAmount;
                    provisionalAmount += originalPrice
                    initialTotal += originalPrice * discountPercentage || 0;
                });
                countProducts = updatedCarts.length;
            }

            setSelectAllChecked(!selectAllChecked);
        }
        setCarts(updatedCarts);
        setProvisionalAmount(provisionalAmount)
        setTotalDiscountedAmount(totalDiscountedAmount);
        setTotalAmount(initialTotal);
        setCountProducts(countProducts);
    }

    useEffect(() => {
        let totalDiscountedAmount = 0;
        let initialTotal = 0;
        let provisionalAmount = 0;
        const selectedItems = carts.filter((item) => item.selected);

        selectedItems.forEach((item) => {
            const originalPrice = intoMoney[item.id];
            const discountPercentage = ((100 - promotionPercentage[item.id]) / 100 || 0);
            const discountedAmount = calculateDiscountedAmount(originalPrice, discountPercentage);

            totalDiscountedAmount += discountedAmount;
            provisionalAmount += originalPrice
            initialTotal += originalPrice * discountPercentage || 0;
        });
        setProvisionalAmount(provisionalAmount)
        setTotalDiscountedAmount(totalDiscountedAmount);
        setTotalAmount(initialTotal);
        setCountProducts(selectedItems.length);
        setSelectAllChecked(selectedItems.length === carts.length && carts.length > 0);
    }, [carts]);

    const handleButtonClick = () => {
        //window.location.href = '/pay';
        const address = localStorage.getItem('Address')
        const phone = localStorage.getItem('Phone')

        if(address==null && phone==null)
        {
            navigate("/shipping")      

        }
        else{
            navigate("/pay")      
        }
      };

    return (
        <>
            <div style={{ backgroundColor: "#f5f5fa" }}>
                <div className="cart-body">
                    <div className="main-title">
                        <h4>GIỎ HÀNG</h4>
                    </div>
                    <Row className="main-cart">
                        <Col sm={9}>
                            <Row className="main-cart-header">
                                <Col sm={5} className="cart-all">
                                    <div className="iUnYbj">
                                        <Form.Check
                                            className="ioqOoJ"
                                            type="checkbox"
                                            checked={selectAllChecked}
                                            onChange={() => handleCheckboxChange(null)}
                                        />
                                        <span>
                                            Tất cả</span>
                                    </div>
                                </Col>
                                <Col sm={2} className="cart-unit-price"><span>Đơn giá</span></Col>
                                <Col sm={1} className="cart-quantity"><span>Số lượng</span></Col>
                                <Col sm={2} className="cart-price"><span>Thành tiền</span></Col>
                                <Col sm={1} className="cart-icon-trash"><i class="fas fa-trash" aria-hidden="true"></i></Col>
                            </Row>

                            <Row className="main-cart-header">
                                {
                                    carts.map(item => {
                                        return (
                                            <>
                                                <div className="jjBWEQ fNFAoO" key={item.id}>
                                                    <Col sm={5} className="cart-all cart-main-all iUnYbj">
                                                        <Form.Check
                                                            type="checkbox"
                                                            className="ioqOoJ"
                                                            checked={carts.find((cartItem) => cartItem.id === item.id)?.selected || false}

                                                            onChange={() => handleCheckboxChange(item.id, item.bookId)}
                                                        />
                                                        <Link>
                                                            <div className="fWjUGo">
                                                                <Image src={`https://localhost:7106/images/${item.fileName}`} className="cart_image" />
                                                            </div>

                                                        </Link>
                                                        <div className="eBPgyQ">
                                                            <Link className="etRDZR">
                                                                {item.bookName}
                                                            </Link>
                                                        </div>
                                                    </Col>
                                                    <Col sm={2} className="cart-unit-price">
                                                        <div className="mqMAG">
                                                            {item.price.toLocaleString("en-US").replace(/,/g, '.')}
                                                            <sup>₫</sup>
                                                        </div>
                                                    </Col>
                                                    <Col sm={1} className="cart-quantity cart-main-quantity">
                                                        <InputGroup className="gEpOC">
                                                            <Button
                                                                className="qty-decrease"
                                                                variant="outline-secondary"
                                                                onClick={() => handleDecrement(item.id, item.price, item.bookId)}
                                                            >
                                                                <i class="fas fa-minus cart-icon-minus-plus"></i>
                                                            </Button>
                                                            <FormControl
                                                                aria-label="Count"
                                                                aria-describedby="basic-addon2"
                                                                value={quantity[item.id]}
                                                                onChange={(event) => handleInputChange(item.id, item.price, event, item.bookId)}
                                                            />
                                                            <Button
                                                                className="qty-increase"
                                                                variant="outline-secondary"
                                                                onClick={() => handleIncrement(item.id, item.price, item.bookId)}
                                                            >
                                                                <i class="fas fa-plus cart-icon-minus-plus"></i>
                                                            </Button>
                                                        </InputGroup>
                                                    </Col>
                                                    <Col sm={2} className="cart-price cart-main-price">
                                                        {(intoMoney[item.id] || 0).toLocaleString("en-US").replace(/,/g, '.')}
                                                        <sup>₫</sup>
                                                    </Col>
                                                    <Col sm={1} className="cart-icon-trash cart-main-icon-trash">
                                                        <Button onClick={() => handleShowDelete(item.id)}>
                                                            <i class="fas fa-trash" aria-hidden="true"></i>
                                                        </Button>
                                                    </Col>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                        <Col className="eEhtFa" sm={3}>
                            <div className="gMwcWr">
                                <ul className="cart-prices-items">
                                    <li className="cart-prices-item">
                                        <div className="cart-prices-text">Tạm tính</div>
                                        <div className="cart-prices-value">
                                            {totalAmount ? (
                                                <div className="prices__value">
                                                    {provisionalAmount.toLocaleString("en-US").replace(/,/g, '.')}
                                                    <sup>₫</sup>
                                                </div>
                                            ) : (
                                                <div className="prices__value">
                                                    0
                                                    <sup>₫</sup>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                    <li className="cart-prices-item">
                                        <div className="cart-prices-text">Giảm giá</div>
                                        <div className="cart-prices-value">
                                            {totalAmount ? (
                                                <div className="prices__value">
                                                    {totalDiscountedAmount.toLocaleString("en-US").replace(/,/g, '.')}
                                                    <sup>₫</sup>
                                                </div>
                                            ) : (
                                                <div className="prices__value">
                                                    0
                                                    <sup>₫</sup>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                </ul>

                                <div className="prices__total">
                                    <span className="prices__text">
                                        Tổng tiền
                                    </span>
                                    <div className="prices__content">
                                        {totalAmount ? (
                                            <div className="prices__value">
                                                {totalAmount.toLocaleString("en-US").replace(/,/g, '.')}
                                                <sup>₫</sup>
                                            </div>
                                        ) : (
                                            <div className="prices__value--empty">Vui lòng chọn sản phẩm</div>
                                        )}
                                        <span className="prices__value--noted">(Đã bao gồm VAT nếu có)</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="dGoOLh" onClick={handleButtonClick}>
                                Mua Hàng ({countProducts})
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>

            <Modal show={showDelete} onHide={handleCloseDelete} centered size="sm">
                <Modal.Header closeButton>
                    <Modal.Title> <i className="fas fa-exclamation-triangle cart-icon-danger" aria-hidden="true"></i> Xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa sản phẩm đang chọn?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faCheck} /> Đồng ý
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default Cart;