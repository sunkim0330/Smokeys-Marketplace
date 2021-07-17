import React, {useState, useEffect} from 'react';


const TransactionTradeItem = ( { item, setTradeItem } ) => {

  const selectItem = () => {

    setTradeItem(item._id)
    // console.log(e.target.getAttribute("id"))
  }
  return (
      <div onClick={() => selectItem()}>{item.name}</div>
  )
}
export default TransactionTradeItem;