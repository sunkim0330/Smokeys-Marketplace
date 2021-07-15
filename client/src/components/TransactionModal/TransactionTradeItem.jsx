import React, {useState, useEffect} from 'react';


const TransactionTradeItem = ( { item, setTradeItem} ) => {


  // console.log('username', item.user_docs[0].firstName)
  console.log('iiittttemmmm', item._id)
  return (
    <div>
      <div onClick={() => setTradeItem(item._id)}>{item.name}</div>
    </div>
  )
}
export default TransactionTradeItem;