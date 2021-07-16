import React, {useState, useEffect} from 'react';
import Marketplace from './Marketplace.jsx';

const MarketplaceSearch = ( {
  filteredItems,
  setFilteredItems,
  marketItems,
  setMarketItems
  } ) => {

  const [searchEntry, setSearchEntry] = useState('')

  const filterResults = () => {

    if (searchEntry.length < 1) {
      setFilteredItems(marketItems)
    } else {
      setFilteredItems([]);
      for (let i = 0; i < marketItems.length; i++ ) {

        if (marketItems[i].name.toLowerCase().includes(searchEntry)) {
          console.log('item:  ', marketItems[i].name)
          setFilteredItems(prev => [...prev, marketItems[i]])
        }
      }
    }
  }

  useEffect(() => {
    filterResults()
  }, [])

  useEffect(() => {
    filterResults()
  }, [searchEntry])

  // useEffect(() => {
  //    console.log('filteredItems :', filteredItems)
  // }, [filteredItems])



  return (
    <div className="search-container">
     <div><i className="fas fa-search"></i>Search</div>
      <input
        className="marketplace-input-search"
        type="text"
        placeholder="Search for Trades"
        value={searchEntry}
        onChange={e => setSearchEntry(e.target.value)}
        />
    </div>
  )
};

export default MarketplaceSearch;
