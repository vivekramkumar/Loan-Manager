import React, { useState, useEffect } from 'react'
import ItemBanner from './ItemBanner';
import PendingItemTable from './PendingItemTable';
import PropTypes from 'prop-types'
import { Row, Form, Button } from 'react-bootstrap';


const PendingItem = ({ bannerBackground, bannerName, items, category }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tableItems, setTableItems] = useState([])
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
            setPageSize(items.length);
            setCurrentPage(1);
            setTableItems(items.slice(0, items.length));
    }, [items])

    return (
        <div>
                        <Button variant="outline-light" className="mt-2 mr-md-3" >View All Users</Button>

            <ItemBanner
                background={bannerBackground}
                bannerName={bannerName} />
            <PendingItemTable
                category={category}
                items={tableItems}
                initialItemNo={(currentPage - 1) * pageSize} />
            
        </div>
    )

}

PendingItem.propTypes = {
    bannerBackground: PropTypes.string.isRequired,
    bannerName: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired

}


export default PendingItem;
