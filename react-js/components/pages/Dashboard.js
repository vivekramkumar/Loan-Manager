import React, { Fragment } from 'react'
import Header from '../dashboard/Header';
import Items from '../dashboard/Items';
import AddItemFAB from '../dashboard/AddItemFAB';
import ModalAddItem from '../modal/ModalAddItem';
import ModalAddUser from '../modal/ModalAddUser';
import AddUserFAB from '../dashboard/AddUserFAB'

const Dashboard = (props) => {
    

    return (
        <Fragment>
            <Header />
            <Items />
            <AddItemFAB/>
            <ModalAddItem />
        </Fragment >
    )
}

export default Dashboard;
