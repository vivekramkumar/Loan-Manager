import React, { useContext, useEffect, useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormInput from '../html/FormInput';
import FormBanner from '../html/FormBanner';
import AuthContext from '../../context/auth/authContext';
import { Formik } from 'formik';
import { validationSchema, initialValues } from '../../validation/loginValidation';
import BgDarkOverlay from '../layout/BgDarkOverlay';
const Login = (props) => {
    const authContext = useContext(AuthContext);
    const { userLogin, isAuthenticated} = authContext;
    useEffect(() => {
        // redirect to dashboard
        console.log("^^^^^^^^"+isAuthenticated);
        if (isAuthenticated) {
            //console.log("usertype : "+props.userType);
            //console.log("login : "+userType);

            props.history.push('/dashboard');
        }
        // eslint-disable-next-line
    }, [isAuthenticated]);

    const onSubmit = (formData) => {
        const { email, password, rememberMe } = formData;

        userLogin({
            email,
            password
        }, rememberMe);
    }

    return (
        <BgDarkOverlay>
            <FormBanner icon="fa-sign-in" />
            <Formik
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                initialValues={initialValues}>
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isValid,
                    dirty
                }) => (
                        < Form noValidate onSubmit={handleSubmit}>
                            <FormInput
                                name="email"
                                label="Email address"
                                type="email"
                                placeHolder="Enter email address"
                                value={values.email}
                                error={errors.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.email && !!errors.email}

                            />
                            <FormInput
                                name="password"
                                label="Password"
                                type="password"
                                placeHolder="Enter password"
                                value={values.password}
                                error={errors.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.password && !!errors.password}
                            />
                            <FormInput type="hidden" name="loginType" value="USER" />

                            <Row className="mb-4 px-3">
                                <div className="custom-control custom-checkbox">
                                    <Form.Control
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        className="custom-control-input"
                                        value={values.chk}
                                        onChange={handleChange}>
                                    </Form.Control>
                                    <Form.Label htmlFor="rememberMe" className="custom-control-label text-sm">Remember me</Form.Label>
                                </div>
                                
                            </Row>

                            <Form.Group className="mb-3">
                                <Button
                                    variant="primary"
                                    disabled={!(isValid && dirty)}
                                    type="submit"
                                    block>
                                    SIGN IN
                                </Button>
                            </Form.Group>

                        </ Form>
                    )
                }
            </Formik>
            <Row className="px-3">
                <span
                    className="text-sm"
                    style={{ paddingTop: "2px" }}>
                    Sign in as Admin? &nbsp;
                    </span>
                <Link
                    className="font-weight-bold text-lg text-warning"
                    to="/admin-login">
                    Admin Login
                </Link>
            </Row>
        </BgDarkOverlay>
    )
}

export default Login

