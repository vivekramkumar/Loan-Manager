import React, { Fragment, useContext, useEffect } from 'react'
import Item from './Item/Item';
import ItemContext from '../../context/item/itemContext';
import { Navbar as AppBar, Nav, Button } from 'react-bootstrap';

const Items = () => {
    const itemContext = useContext(ItemContext);
    const { loans, payments, getItems } = itemContext;
    //const { userDetails } = userContext;

    useEffect(() => {
        getItems();
    }, []);

    const onSubmit = formData => {
        const { email,password,firstName, lastName } = formData;
//        updateUser(current.itemId, { email,password,firstName, lastName });
  //      onHide();
    };

    return (
        <Fragment>
            <Item
                bannerBackground="bg-success"
                bannerName="Loan Taken"
                items={loans}
                category={"loan"} />
            <Item
                bannerBackground="bg-danger"
                bannerName="Loan Paid"
                items={payments}
                category={"payment"} />
        </Fragment>
    )
}

export default Items
