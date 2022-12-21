import React, { useState, useEffect } from 'react'
import UserBanner from './UserBanner';
import UserTable from './UserTable';
import PropTypes from 'prop-types'

const User = ({ bannerBackground, bannerName, users }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tableUsers, setTableUsers] = useState([])
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
            setPageSize(users.length);
            setCurrentPage(1);
            setTableUsers(users.slice(0, users.length));
    }, [users])

    return (
        <div>
            <UserBanner
                background={bannerBackground}
                bannerName={bannerName} />
            <UserTable
               
                users={tableUsers}
                initialUserNo={(currentPage - 1) * pageSize} />
            
        </div>
    )

}

User.propTypes = {
    bannerBackground: PropTypes.string.isRequired,
    bannerName: PropTypes.string.isRequired,
    //users: PropTypes.array.isRequired

}


export default User;
