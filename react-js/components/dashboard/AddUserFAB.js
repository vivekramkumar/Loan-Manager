import React, { Fragment, useContext } from 'react'
import "../../css/fab-button.css";
import { Button } from 'react-bootstrap';
import UserContext from '../../context/user/UserContext';

const AddUserFAB = () => {
    const userContext = useContext(UserContext);
    const { showModal } = userContext;

    return (
        <Fragment>
            <div >
                <Button
                
                    variant="primary"
                    size="lg"
                    className='btn-fab'
                    onClick={showModal}>
                    <i>View details</i>
                </Button>
            </div>
        </Fragment>
    )
}

export default AddUserFAB
