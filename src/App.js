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
  const [stateOn, setStateOn] = useState(true)
  const [genreOn, setGenreOn] = useState(true)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [restaurantsPerPage, setRestaurantsPerPage] = useState(10)


  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true)
      fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
        headers: {
          Authorization: 'Api-Key q3MNxtfep8Gt',
        },
      })
        .then(data => data.json())
        .then(result => {
          setLoading(false)
          setRestaurants(result)
          setDisplayRestaurants(result)
          setFilterState(result)
          setFilterGenre(result)
        })
    }
    fetchRestaurants()
  }, [])

  const filterType = ['state', 'genre']

  const dropdownRender = filterType.map((type, idx) => {
    let title = ''
    if (type === 'state') {
      title = 'State'
    }
    else title = 'Genre'
    return (
      <span className="filter" key={`filter${type}`}>
        {title}:
        <FilterDropdown
          key={`${type}-${idx}`}
          type={type}
          restaurants={restaurants}
          setDisplayRestaurants={setDisplayRestaurants}
          setFilterState={setFilterState}
          setFilterGenre={setFilterGenre}
          stateOn={stateOn}
          setStateOn={setStateOn}
          genreOn={genreOn}
          setGenreOn={setGenreOn}
          setCurrentPage={setCurrentPage}
        />
      </span>
    )
  })

  return (
    <div className="App">
      <div className="App-div">
        <SearchBar setQuery={setQuery} setCurrentPage={setCurrentPage} />
        <span className="spacer"></span>
        <span className="filterTitle">Filter by
        {dropdownRender}
        </span>
        <TableDisplay
          allRestaurants={displayRestaurants}
          filterState={filterState}
          filterGenre={filterGenre}
          query={query}
          stateOn={stateOn}
          genreOn={genreOn}
          loading={loading}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          restaurantsPerPage={restaurantsPerPage}
        />
      </div>
    </div>
  );
}

export default App;
