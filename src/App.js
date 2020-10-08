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

  console.log(filterState)
  console.log(filterGenre)

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

  return (
    <div className="App">
      <div className="App-div">
        <FilterDropdown type="state" restaurants={restaurants} setDisplayRestaurants={setDisplayRestaurants} setFilterState={setFilterState} />
        <FilterDropdown type="genre" restaurants={restaurants} setDisplayRestaurants={setDisplayRestaurants} setFilterGenre={setFilterGenre} />
        <TableDisplay restaurants={displayRestaurants} />
      </div>
    </div>
  );
}

export default App;
