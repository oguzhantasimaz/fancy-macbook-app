import React, { useState } from 'react'
import './App.scss'
import { CardList } from './components/CardList';
import { Search } from './components/Search';
import { Sidebar } from './components/Sidebar';
import { SearchItemList } from './components/SearchItemList';
import { ScrollToTop } from './components/ScrollToTop';

const App = () => {
  const [inputData, setInputData] = useState([]);
  const [filteredKeyword, setFilteredKeyword] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const setData = (apps) => {
    setInputData(apps);
  }

  const addSearchItem = (item) => {
    setSearchItems([...searchItems, item]);
  }

  const removeSearchItem = (item) => {
    setSearchItems(searchItems.filter(searchItem => searchItem !== item));
  };

  return (
    <div className="container-wrapper">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        inputData={inputData}
      />
      <div className="container">
        <div className={`app ${isOpen ? `narrow` : `wide`}`}>
          <Search
            setFilteredKeyword={setFilteredKeyword}
            setSearchItems={setSearchItems}
            addSearchItem={addSearchItem}
          />
          <SearchItemList
            searchItems={searchItems}
            removeSearchItem={removeSearchItem}
          />
          <CardList
            setData={setData}
            searchItems={searchItems}
            filteredKeyword={filteredKeyword}
          />
        </div>
        <ScrollToTop />
      </div>
    </div>
  );
}

export default App;
