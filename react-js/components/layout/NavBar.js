import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Navbar as AppBar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ItemContext from '../../context/item/itemContext';

const NavBar = () => {
    const itemContext = useContext(ItemContext);
    const authContext = useContext(AuthContext);

    const [dropDown, setDropDown] = useState(false)

    const { clearItems } = itemContext;
    const { isAuthenticated, logout, setAuthentication } = authContext;

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setAuthentication();
    }, []);

    const onLogout = () => {
        logout();
        //clear item list
        clearItems();
    };

    const authLinks = (
        <Fragment>
            <Button variant="outline-light" className="mt-2 mr-md-3" onClick={onLogout}>Logout</Button>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <Link to="/login" className="btn btn-outline-light mt-2 mr-md-3">Sign In</Link>
            <Link to="/register" className="btn btn-outline-light mt-2 mr-md-3">Sign Up</Link>
        </Fragment>
    );

    return (
        <AppBar
        onToggle={setDropDown}
        expanded={dropDown}
        collapseOnSelect expand='md' bg='dark' variant='dark' className="py-2 fixed-top text-white" style={{ borderBottom: "#008ed6 3px solid" }}>
            <AppBar.Brand href='/' style={{ fontSize: "4vh" }}>Loan Management</AppBar.Brand>
            <AppBar.Toggle aria-controls='responsive-navbar-nav' />
            <AppBar.Collapse id='responsive-navbar-nav'>
                <Nav className="ml-auto" onClick={() => setDropDown(false)}>
                    {isAuthenticated ? authLinks : guestLinks}
                </Nav>
            </AppBar.Collapse>

            

        </AppBar>
    )
}

export default NavBar
