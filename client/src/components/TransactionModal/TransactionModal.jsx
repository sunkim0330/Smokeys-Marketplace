import React, {useState, useEffect} from 'react';
import TransactionTradeItem from './TransactionTradeItem.jsx';
import axios from 'axios';

const TransactionModal = ( {displayModal, setDisplayModal, selectedItemModal, setSelectedItemModal, currentUser} ) => {
  const [userItems, setUserItems] = useState([])
  const [tradeItem, setTradeItem] = useState('')

  const getItems = () => {
       axios.get(`/items/${currentUser._id}`)
    // axios.get('/items/${currentUser._id}')
      .then(data => {
        setUserItems(data.data)
      })
      .catch(err => console.log(err))
  }

  const makeTrade = () => {
    axios.post('/transactions/', {
      from_user_id: "60ef1cb062fe173ce7af8805",
      from_item_id: tradeItem,
      to_user_id: selectedItemModal.owner,
      to_item_id: selectedItemModal._id
    })
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
    // from_user_id
    // from_item_id
    // to_user_id
    // to_item_id
  }

  useEffect(()=> {
    getItems()
  }, [])

  // useEffect(()=> {
  //   console.log('tradeItem', tradeItem)
  // }, [tradeItem])


  return (
    <div className="transaction-modal-wrapper">
      <div className="transaction-modal">
      <button className="add-item-btn" onClick={() => setDisplayModal(!displayModal)}>X</button>
        <h4 className="transaction-item-title">{selectedItemModal.name}</h4>
        <div className="transaction-user-rating">User: {selectedItemModal.firstName}</div>
        <div className="image-wrapper">
          <img className="transaction-image" src={selectedItemModal.image}></img>
        </div>
        <h4 className="transaction-item-desc">{selectedItemModal.description}</h4>
        <h4 className="transaction-proposed-title">Proposed Trade Items</h4>
        <div className="proposed-item-wrapper">
          {userItems.map(item => (
                 <TransactionTradeItem
                  key={item._id}
                  item={item}
                  setTradeItem={setTradeItem}
                 />
          ))}
          {/*<h4 className="transaction-proposed-item">Hammer</h4>*/}

        </div>
        <button onClick={makeTrade} className="add-item-btn">Make Trade!</button>
      </div>
    </div>
  )
}

export default TransactionModal;