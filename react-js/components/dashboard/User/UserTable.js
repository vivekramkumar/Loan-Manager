import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import '../../../css/itemTable.css'
import UserContext from '../../../context/user/UserContext';
import ItemContext from '../../../context/item/itemContext';

const UserTable = ({ users, initialUserNo }) => {
    const userContext = useContext(UserContext);
    const itemContext = useContext(ItemContext);

    const { deleteUser, setCurrent, clearCurrent, updateUser } = userContext;
    const{showModal}=itemContext;
    const onUpdateUser = (userId,user) => {
        console.log("%6^^^&&*** "+userId);
        //updateUser(userId,  user );
        setCurrent({ ...user, userId: userId });
        console.log("update user%%%%%%%%%");

        showModal(true);
        console.log("modal user%%%%%%%%%");

    }

    const onDeleteUser = ( user) => {
        deleteUser(user.userId);
        clearCurrent();
    }

    return (
        <div className="px-1 px-md-4 mt-2 text-center" style={{ minHeight: "250px" }}>
            {
            // eslint-disable-next-line
            users.length == 0 &&
                <div>
                    <p className="mt-4" style={{color:"#0000009a"}}> No user available.</p>
                </div>}

            {users.length > 0 &&
                <Table striped bordered responsive style={{ overflow: "auto" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th style={{ minWidth: "300px" }}>Email ID</th>
                            <th style={{ minWidth: "110px" }}>First Name</th>
                            <th>Last Name</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>
                            <tr key={user.userId}>
                                <td>{initialUserNo + index + 1}</td>
                                <td style={{ minWidth: "300px" }}>{user.email}</td>
                                <td>{user.firstName }</td>
                                <td>{user.lastName}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            }
        </div>
    )
}

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    initialUserNo: PropTypes.number.isRequired
}


export default UserTable
