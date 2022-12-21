import React, { useState, useEffect } from 'react'
import ItemBanner from './ItemBanner';
import ItemTable from './ItemTable';
import PropTypes from 'prop-types'

const Item = ({ bannerBackground, bannerName, items, category }) => {
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
            <ItemBanner
                background={bannerBackground}
                bannerName={bannerName} />
            <ItemTable
                category={category}
                items={tableItems}
                initialItemNo={(currentPage - 1) * pageSize} />
            
        </div>
    )

}

Item.propTypes = {
    bannerBackground: PropTypes.string.isRequired,
    bannerName: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired

}


export default Item;
