import React, {useState, useEffect} from 'react';


const TransactionTradeItem = ( { item, setTradeItem} ) => {

  return (
    <div>
      <div onClick={() => setTradeItem(item._id)}>{item.name}</div>
    </div>
  )
}
export default TransactionTradeItem;