import React, {useState, useEffect} from 'react';


const TransactionTradeItem = ( { item, displayModal, setDisplayModal, selectedItemModal, setSelectedItemModal} ) => {

  console.log('iiittttemmmm', item)
  return (
    <div>
      <div>{item.name}</div>
    </div>
  )
}
export default TransactionTradeItem;