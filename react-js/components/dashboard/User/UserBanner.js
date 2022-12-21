import React from 'react'
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'

const UserBanner = ({ bannerName, background }) => {
    return (
        <Card.Header className={"text-center text-white h5 " + background} >
            {bannerName}
        </Card.Header>
    )
}

UserBanner.propTypes = {
    bannerName: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired
}

export default UserBanner
