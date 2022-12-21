import React, { useContext, useEffect, useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormInput from '../html/FormInput';
import FormBanner from '../html/FormBanner';
import AuthContext from '../../context/auth/authContext';
import { Formik } from 'formik';
import { validationSchema, initialValues } from '../../validation/loginValidation';
import BgDarkOverlay from '../layout/BgDarkOverlay';
const AdminLogin = (props) => {
    const authContext = useContext(AuthContext);
    const { adminLogin,isAuthenticated } = authContext;
    const [userType,setuserType ] = useState();
    useEffect(() => {
        // redirect to dashboard
        console.log("authenicate&&&&&&&&&&&"+isAuthenticated);
        if (isAuthenticated) {
            //console.log("usertype : "+login.payload);
            props.history.push('/admin-dashboard');
        }

        // eslint-disable-next-line
    }, [isAuthenticated]);

    const onSubmit = (formData) => {

        const { email, password, rememberMe } = formData;
        //console.log("uuuuuuuuuuuuuuu*****"+loginType);

        adminLogin({
            email,
            password,
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
                            <FormInput id="loginType" type="hidden" name="loginType" value="ADMIN" /> 

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
                    Sign in as User? &nbsp;
                    </span>
                <Link
                    className="font-weight-bold text-lg text-warning"
                    to="/login">
                    User Login
                </Link>
            </Row>
        </BgDarkOverlay>
    )
}

export default AdminLogin

