import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MidSection = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col className="text-center pb-4 pt-5">
                        <h2 className="text-h2 font-weight-bold">Get started with
                        <div className="font-weight-bold"> Loan Management</div>
                        </h2>
                        <Link to="/register" className="btn btn-primary mb-1">Create an Account</Link>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default MidSection
