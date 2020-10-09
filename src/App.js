import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

import SearchBar from './components/SearchBar'
import TableDisplay from './components/TableDisplay'
import FilterDropdown from './components/FilterDropdown'

const App = () => {
  const [restaurants, setRestaurants] = useState([])
  const [displayRestaurants, setDisplayRestaurants] = useState([])
  const [filterState, setFilterState] = useState([])
  const [filterGenre, setFilterGenre] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    })
      .then(data => data.json())
      .then(result => {
        setRestaurants(result)
        setDisplayRestaurants(result)
        setFilterState(result)
        setFilterGenre(result)
      })
  }, [])

  const filterType = ['state', 'genre']

  const dropdownRender = filterType.map((type, idx) => {
    return (
      <FilterDropdown
        key={`${type}-${idx}`}
        type={type}
        restaurants={restaurants}
        setDisplayRestaurants={setDisplayRestaurants}
        setFilterState={setFilterState}
        setFilterGenre={setFilterGenre}
      />
    )
  })

  return (
    <div className="App">
      <div className="App-div">
        <SearchBar setQuery={setQuery} />
        {dropdownRender}
        <TableDisplay
          restaurants={displayRestaurants}
          filterState={filterState}
          filterGenre={filterGenre}
          query={query}
        />
      </div>
    </div>
  );
}

export default App;
