import React, { Fragment, useContext, useEffect } from 'react'
import Item from './Item/Item';
import ItemContext from '../../context/item/itemContext';
import PendingItem from './Item/PendingItem';
import { Row, Form, Button } from 'react-bootstrap';
import UserContext from '../../context/user/UserContext';
import { useHistory } from "react-router-dom";
const PendingLoans = () => {
    const navigate = useHistory();
    const itemContext = useContext(ItemContext);
    const { loans, payments, getPendingItems, } = itemContext;
    const userContext= useContext(UserContext);
    const {getAllUsers}= userContext;
    useEffect(() => {
        getPendingItems();
    }, []);

    return (
        <Fragment>
           <PendingItem
                bannerBackground="bg-success"
                bannerName="Loan Approval List"
                items={loans}
                category={"loan"} />
                <Form.Group className="mb-3">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={() => navigate.push("/show-all-users")}>
                                    Show All Users
                                </Button>
                            </Form.Group>
            
        </Fragment>
    )
}

export default PendingLoans
