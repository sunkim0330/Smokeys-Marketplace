import React, {useState, useEffect} from 'react';
import TransactionTradeItem from './TransactionTradeItem.jsx';
import axios from 'axios';

const TransactionModal = ( {displayModal, setDisplayModal, selectedItemModal, setSelectedItemModal} ) => {
  const [userItems, setUserItems] = useState([])


  const getItems = () => {
       axios.get('/items/?user_object_id=60ef1cb062fe173ce7af8805')
    // axios.get('/items/${currentUser._id}')
      .then(data => {
        setUserItems(data.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(()=> {
    getItems()
  }, [])

  useEffect(()=> {
    console.log('user::::::', userItems)
  }, [userItems])

  return (
    <div className="transaction-modal-wrapper">
      <div className="transaction-modal">
      <button className="Close" onClick={() => setDisplayModal(!displayModal)}>X</button>
        <h4 className="transaction-item-title">{selectedItemModal.name}</h4>
        <h4 className="transaction-user-rating">Other User (3.4)</h4>
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
                 />
          ))}
          {/*<h4 className="transaction-proposed-item">Hammer</h4>*/}

        </div>
        <button className="transaction-button">Make Trade!</button>
      </div>
    </div>
  )
}

export default TransactionModal;