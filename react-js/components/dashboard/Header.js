import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ItemContext from '../../context/item/itemContext';
import { getItemTotal, getTotalPaymentPercentage } from '../../utils/loan';
import '../../css/header-dashboard.css';

const Header = () => {
    const [loan, setLoan] = useState(0)
    const [totalLoan, setTotalLoan] = useState(0)
    const [totalPayment, setTotalPayment] = useState(0)
    const [paymentPercentage, setPaymentPercentage] = useState(0)

    const itemContext = useContext(ItemContext);
    const { loans, payments } = itemContext;
    //console.log(loans.status.includes("approve"));
    useEffect(() => {
        const loan = getItemTotal(loans);
        const payment = getItemTotal(payments);
        const percentage = getTotalPaymentPercentage(loan, payment);

        setTotalLoan(loan);
        setTotalPayment(payment);
        setPaymentPercentage(percentage);
        setLoan(loan - payment);

    }, [loans, payments]);

    return (
        <div className='home-section text-white'>
            <div className='dark-over' style={{ paddingTop: "140px" }}>
                <Container>
                    <h2 className="text-center mb-0"> Loan Left to be Paid</h2>
                    <h1 className="display-5 text-center">{loan}</h1>
                    <Row className="py-2 px-3 mx-3 mx-sm-auto banner-green">
                        <Col className="text-left">Loan Taken</Col>
                        <Col className="text-left">{totalLoan}</Col>
                        <Col className="col-2"></Col>
                    </Row>
                    <Row className="py-2 px-3 my-2 mx-3 mx-sm-auto banner-red">
                        <Col className="text-left">Loan Paid</Col>
                        <Col className="text-left">{totalPayment}</Col>
                        <Col className="col-2 px-0 text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} >
                            <span className="">{paymentPercentage}</span> %
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Header
