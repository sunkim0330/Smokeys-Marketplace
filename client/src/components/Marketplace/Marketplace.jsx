import React, {useState, useEffect} from 'react';
import MarketplaceList from './MarketplaceList.jsx';
import MarketplaceSearch from './MarketplaceSearch.jsx';
import axios from 'axios';

const Marketplace = () => {
  let currentUser = "60ef1cb062fe173ce7af8805"

  const [marketItems, getMarketItems] = useState([]);

  const getAllMarketItems = () => {
    // let body = {  params: {
    //   user_object_id: "60ef1cb062fe173ce7af8805",
    //   location: "08724"
    //   }
    // }
    // console.log('running')
    axios.get('/items?user_object_id=60ef1cb062fe173ce7af8805&location=08724')
    .then((response) => {
      console.log('response:   ', response.data)
      // getMarketItems(data.data)
    })
    .catch(err => {
      console.log('error', err)
    })
  }

  useEffect(() => {
    getAllMarketItems()
  }, [])

  // useEffect(() => {
  //   console.log('items', marketItems)
  // }, [marketItems])

  return (
    <div className="marketplace-container">
    <MarketplaceSearch />
     <div className="marketplace-list-container">
      <MarketplaceList />
     </div>
    </div>
  )
};

export default Marketplace;
