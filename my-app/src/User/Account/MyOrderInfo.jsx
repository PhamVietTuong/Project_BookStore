import { useState } from "react";
import { Link } from "react-router-dom";

const MyOrderInfo = ({ ListOfOrder }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày mua</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {ListOfOrder.map((item) => {
            return (
              <tr>
                <td>
                  <Link to={`invoice/detail/${item.id}`}>{item.code}</Link>
                </td>
                <td>{item.issuedDate}</td>
                {/* <td><a href={`/productDetail?id=${item.ProductID}`}>{ item.ProductName }</a></td> */}
                <td>{item.bookName}</td>
                <td>
                  {item.total.toLocaleString("en-US").replace(/,/g, ".")} ₫
                </td>
                <td>{item.approveOrder}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MyOrderInfo;
