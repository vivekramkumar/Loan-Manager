import React, { useState, useContext, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import moment from 'moment';
import ItemContext from '../../context/item/itemContext';
import UserContext from '../../context/user/UserContext';

import { Formik } from 'formik';
//import { validationSchema } from '../../validation/itemValidation';

const ModalAddUser = () => {
    const userContext = useContext(UserContext);
    const { addUser, updateUser, clearCurrent, current, isModalShowing, hideModal } = userContext;
    const [isUserUpdate, setIsUserUpdate] = useState(false);

    const [initialValues, setInitialValues] = useState({
        firstname: '',
        lastname: '',
        password: '',
        email: ''
    });

    useEffect(() => {
        if (current != null && current.userId !== undefined) {
            setInitialValues(current);
            setIsUserUpdate(true);
        } else {
            setInitialValues({
                firstname: '',
                lastname: '',
                password: '',
                email: ''
            });
            setIsUserUpdate(false);
        }
        // eslint-disable-next-line
    }, [current]);

    const onSubmit = formData => {
        const { email, firstname, lastname, password } = formData;
        if (isUserUpdate) {
            updateUser(email, current.userId, { firstname, lastname, password });
        } else {
            //addItem(email, { firstname, lastname, password });
        }
        onHide();
    };

    const onHide = () => {
        hideModal();
        clearCurrent();
    }

    return (
        <Modal
            centered
            show={isModalShowing}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            aria-labelledby='modal-add-item'>
            <Modal.Header closeButton className="bg-secondary text-white">
                <Modal.Title id='modal-add-item'>{ `Update User`}</Modal.Title>
            </Modal.Header>
            <Formik
                enableReinitialize
                onSubmit={onSubmit}
                initialValues={initialValues}>
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    dirty,
                    isValid,
                    touched,
                    handleBlur
                }) => (
                        <Form noValipassword onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group controlId="ControlSelect2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        as="select"
                                        custom
                                        name="email"
                                        disabled={isUserUpdate}
                                        value={values.email}
                                        error={errors.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && !!errors.email}>
                                        
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" className="my-0" style={{ color: "#ffa481" }}>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="ControlInput1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Hose Rent"
                                        name="firstname"
                                        value={values.firstname}
                                        error={errors.firstname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.firstname && !!errors.firstname} />
                                    <Form.Control.Feedback type="invalid" className="my-0" style={{ color: "#ffa481" }}>
                                        {errors.firstname}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="ControlInput3">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="10000"
                                        name="lastname"
                                        value={values.lastname}
                                        error={errors.lastname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.lastname && !!errors.lastname} />
                                    <Form.Control.Feedback type="invalid" className="my-0" style={{ color: "#ffa481" }}>
                                        {errors.lastname}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="ControlInput4">
                                    <Form.Label>Date</Form.Label>
                                    {}
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        error={errors.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && !!errors.password} />
                                    <Form.Control.Feedback type="invalid" className="my-0" style={{ color: "#ffa481" }}>
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Modal.Body>

                            <Modal.Footer className="justify-content-center">
                                <Button variant="primary" disabled={!(dirty)} type="submit" block>
                                    Submit
                                </Button>
                                <Button variant="outline-secondary" onClick={onHide} block>
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )
                }
            </Formik>
        </Modal>
    );
};

export default ModalAddUser;
