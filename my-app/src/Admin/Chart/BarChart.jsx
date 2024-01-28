import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import "./BarChart.css"
import { Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import AxiosClient from "../../Axios/AxiosClient";
import Index from "../Index";

const BarChart = () => {
    const [months, setMonths] = useState([]);
    const [data, setData] = useState([]);
    const [statistical, setStatistical] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState([
        "#3cba9f",
        "#e8c3b9",
        "#c45850",
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba'
    ]);

    const filter = (e) => {
        try {
            AxiosClient.get(`/Invoices/statistical`, {
                params: {
                    value: e.target.value
                }
            }).then((res) => {
                setStatistical(res.data)
                setMonths(res.data.map(item => item.month))
                setData(res.data.map(item => item.totalToThis))
            })
        }
        catch(e) {
            console.log("Error barChart: ", e);
        }
    }

    useEffect(() => {
        try {
            AxiosClient.get(`/Invoices/statistical`, {
                params: {
                    value: "day"
                }
            }).then((res) => {
                setStatistical(res.data)
                setMonths(res.data.map(item => item.month))
                setData(res.data.map(item => item.totalToThis))
            })
        }
        catch (e) {
            console.log("Error barChart: ", e);
        }
    }, []);

    return (
        <>
            <div className="barChart_App">
                <div className="barChart_Content">
                    <h4>
                        Thống kê doanh thu
                    </h4>
                </div>
                
                <div className="barChart_filter">
                    <Form.Group className="mb-3 d-flex">
                        <Form.Label>Thống kê theo: </Form.Label>
                        <Form.Select onChange={filter}>
                            <option value="day">Ngày</option>
                            <option value="month">Tháng</option>
                            <option value="year">Năm</option>
                        </Form.Select>
                    </Form.Group>
                </div>

                <div className="barChart_result">
                    <Row>
                        <Col sm={2}>
                            <Form.Group>
                                <Form.Label>Tổng số sách bán được</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col sm={1} className="barChart_result_total">
                            <Form.Group>
                                <Form.Label>{statistical.reduce((acc, crr) => acc + crr.booksSoldCount, 0)}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col sm={9}></Col>
                        <hr className="barChart_hr" />
                    </Row>

                    <Row>
                        <Col sm={2}>
                            <Form.Group>
                                <Form.Label>Tổng doanh thu</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col sm={1} className="barChart_result_total">
                            <Form.Group>
                                <Form.Label>{statistical.reduce((acc, crr) => acc + crr.totalToThis, 0).toLocaleString("en-US").replace(/,/g, '.')} ₫</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col sm={9}></Col>
                        <hr className="barChart_hr" />
                    </Row>
                </div>

                <div className="barChart_statistical">
                        <Bar
                            data={{
                                labels: months,
                            datasets: [
                                {
                                    label: "Tổng tiền",
                                    backgroundColor: backgroundColor,
                                    data: data
                                }
                            ]
                            }}
                        />
                </div>

                
            </div >
        </>
    );
}

export default BarChart;