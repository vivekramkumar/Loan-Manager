import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'
import { Row, Form, Button } from 'react-bootstrap';

import PropTypes from 'prop-types'
import '../../../css/itemTable.css'
import ItemContext from '../../../context/item/itemContext';

const ItemTable = ({ category, items, initialItemNo }) => {
    const itemContext = useContext(ItemContext);
    const { deleteItem, setCurrent, clearCurrent, showModal, ApproveLoan, RejectLoan } = itemContext;

    const onApproveItem = (category,item) => {
        console.log("$%%^^&&&"+category);
        //setCurrent({ ...item, category: category });
        ApproveLoan(category,item);
        //showModal(true);
        clearCurrent();

    }

    const onRejectItem = (item) => {
        //deleteItem(category, item.itemId);
        RejectLoan(item);
        clearCurrent();
    }

    return (
        <div className="px-1 px-md-4 mt-2 text-center" style={{ minHeight: "250px" }}>
            {
            // eslint-disable-next-line
            items.length == 0 &&
                <div>
                    <p className="mt-4" style={{color:"#0000009a"}}> No {category} item available.</p>
                </div>}

            {items.length > 0 &&
                <Table striped bordered responsive style={{ overflow: "auto" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th style={{ minWidth: "300px" }}>User Name</th>

                            <th style={{ minWidth: "300px" }}>Description</th>
                            <th style={{ minWidth: "110px" }}>Date</th>
                            <th>Amount</th>
                            <th>Approve</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) =>
                            <tr key={item.itemId}>
                                <td>{initialItemNo + index + 1}</td>
                                <td style={{ minWidth: "300px" }}>{item.userDetails.firstName}</td>
                                <td style={{ minWidth: "300px" }}>{item.description}</td>
                                <td>{item.date}</td>
                                <td>{item.amount}</td>
                                <td>
                                <Form.Group className="mb-3">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    block
                                    onClick={(e) => onApproveItem("loan",item.itemId)}
                                    >
                                    Approve
                                </Button> 
                                </Form.Group>
                                </td>

                                <td>

                                <Form.Group className="mb-3">
                                <Button
                                    variant="primary"
                                    //disabled={!(isValid && dirty)}
                                    type="submit"
                                    block
                                    onClick={(e) => onRejectItem(item.itemId)}>
                                    Reject
                                </Button>   
                                </Form.Group>
                                </td>
                                
                            </tr>
                        )}
                    </tbody>
                </Table>
            }
        </div>
    )
}

ItemTable.propTypes = {
    category: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    initialItemNo: PropTypes.number.isRequired
}


export default ItemTable
