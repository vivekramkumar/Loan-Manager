import React, { Fragment, useEffect, useContext } from 'react';
import Header from '../homepage/Header';
import MidSection from '../homepage/MidSection';
import { getQueryStringParams } from '../../utils/stringUtils';
import MessageContext from '../../context/message/messageContext';

const Home = (props) => {

    useEffect(() => {
        const params = getQueryStringParams(props.location.search);
        // eslint-disable-next-line
        
            props.history.push('/login');
        

        if(localStorage.getItem('token'))
            props.history.push("/dashboard");
    }, [])

    return (
        <Fragment>
            <Header />
            <MidSection />
        </Fragment>
    )
}

export default Home;
