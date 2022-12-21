import React from 'react';
import { Modal } from 'react-bootstrap';

const About = (props) => {
    return (
        <Modal
            {...props} centered
            aria-labelledby='modal-add-item'>

                <Modal.Body className="text-center">
                <h4>Loan Management</h4>
                <div className="px-4">
                    <hr></hr>
                </div>
                
            </Modal.Body>

            
        </Modal>
    );
};

export default About;
