import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

import TableDisplay from './components/TableDisplay'
import FilterDropdown from './components/FilterDropdown'

const App = () => {
  const [restaurants, setRestaurants] = useState([])
  const [displayRestaurants, setDisplayRestaurants] = useState([])
  const [filterState, setFilterState] = useState('all')
  const [filterGenre, setFilterGenre] = useState('all')

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
      })
  }, [])

  const filterType = ['state', 'genre']

  const dropDownRender = filterType.map((type, idx) => {
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
        {dropDownRender}
        <TableDisplay restaurants={displayRestaurants} />
      </div>
    </div>
  );
}

export default App;
