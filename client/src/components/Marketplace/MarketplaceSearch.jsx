import React, {useState, useEffect} from 'react';


const MarketplaceSearch = () => {
  const [searchEntry, setSearchEntry] = useState('')
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
