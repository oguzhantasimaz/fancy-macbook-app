import React, { useEffect, useRef, useState } from 'react'
import './App.scss'
import { CardList } from './components/CardList';
import { Search } from './components/Search';
import { Sidebar } from './components/Sidebar';
import { SearchItemList } from './components/SearchItemList';
import { ScrollToTop } from './components/ScrollToTop';
import { BadgeList } from './components/BadgeList';
import { Welcome } from './components/Welcome';

const App = () => {
  const [inputData, setInputData] = useState([]);
  const [filteredKeyword, setFilteredKeyword] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const [inputItems, setInputItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef(null);

  const setData = (apps) => {
    setInputData(apps);
    setIsOpen(true);

    if (apps.length === 0) {
      setIsOpen(false);
    }
  }

  const addSearchItem = (item) => {
    setSearchItems([...new Set([...searchItems, item])]);
  }

  const removeSearchItem = (item) => {
    setSearchItems(searchItems.filter(searchItem => searchItem !== item));
  };

  const addSearchCategory = (category) => {
    setSearchItems([...new Set([...searchItems, category])]);
  }

  const scrollToInput = () => {
    searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
  }

  const isItemAdded = (item) => inputItems.some(inputItem => inputItem.id === item.id);

  const addToInput = (item) => {
    if (!isItemAdded(item)) {
      setInputItems([...inputItems, item]);
    }
  }

  const removeFromInput = (item) => {
    if (isItemAdded(item)) {
      setInputItems(inputItems.filter(i => i.id !== item.id));
    }
  }

  useEffect(() => {
    setData(inputItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputItems]);

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        inputData={inputData}
        removeFromInput={removeFromInput}
      />
      <div className="container-wrapper">
        <div className="container">
          <div className={`app ${isOpen ? `narrow` : `wide`}`}>
            <Welcome scrollToInput={scrollToInput} />
            <div className='content-wrapper'>
              <Search
                setFilteredKeyword={setFilteredKeyword}
                setSearchItems={setSearchItems}
                addSearchItem={addSearchItem}
                scrollToInput={scrollToInput}
                searchInputRef={searchInputRef}
              />
              <BadgeList addSearchCategory={addSearchCategory} />
              <div className="search-item-list-wrapper">
                <SearchItemList
                  searchItems={searchItems}
                  removeSearchItem={removeSearchItem}
                />
              </div>
              <CardList
                addToInput={addToInput}
                removeFromInput={removeFromInput}
                isItemAdded={isItemAdded}
                searchItems={searchItems}
                filteredKeyword={filteredKeyword}
              />
            </div>
            <ScrollToTop />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
