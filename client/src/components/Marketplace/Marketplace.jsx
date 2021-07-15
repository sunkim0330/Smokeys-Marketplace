import React, {useState, useEffect} from 'react';
import MarketplaceList from './MarketplaceList.jsx';
import MarketplaceSearch from './MarketplaceSearch.jsx';
import TransactionModal from '../TransactionModal/TransactionModal.jsx';
import axios from 'axios';

const Marketplace = () => {
  let currentUser = "60ef1cb062fe173ce7af8805"

  const [marketItems, setMarketItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedItemModal, setSelectedItemModal] = useState({
    name: 'error',
    image: 'error',
    description: 'error'
  })

  const getAllMarketItems = () => {
    axios.get('/items?user_object_id=60ef1cb062fe173ce7af8805&location=08724')
    .then((response) => {
      console.log('response:   ', response.data)
      setMarketItems(response.data)
      setFilteredItems(response.data)
    })
    .catch(err => {
      console.log('error', err)
    })
  }

  useEffect(() => {
    getAllMarketItems()
  }, [])

  useEffect(() => {
    console.log('items', marketItems)
  }, [marketItems])

  return (
    <div className="marketplace-container">
    <MarketplaceSearch
      marketItems={marketItems}
      setMarketItems={setMarketItems}
      filteredItems={filteredItems}
      setFilteredItems={setFilteredItems}
      />
     <div className="marketplace-list-container">
      <MarketplaceList
        marketItems={marketItems}
        setMarketItems={setMarketItems}
        filteredItems={filteredItems}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        selectedItemModal={selectedItemModal}
        setSelectedItemModal={setSelectedItemModal} />
     </div>
     {
     displayModal && <TransactionModal
     displayModal={displayModal}
     setDisplayModal={setDisplayModal}
     selectedItemModal={selectedItemModal}
     setSelectedItemModal={setSelectedItemModal} />
     }
    </div>
  )
};

export default Marketplace;
