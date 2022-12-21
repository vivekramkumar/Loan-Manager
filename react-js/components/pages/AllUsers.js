import React, { Fragment, useContext, useEffect } from 'react'
import User from '../dashboard/User/User'
import UserContext from '../../context/user/UserContext';

const AllUsers = () => {

    const userContext = useContext(UserContext);
    const { users , getAllUsers} = userContext;
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <Fragment>
           <User
                bannerBackground="bg-success"
                bannerName="Loan Taken"
                users={users}
                />
        </Fragment>
    )
}

export default AllUsers
