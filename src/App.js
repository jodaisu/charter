import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import TableDisplay from './containers/TableDisplay'

const App = () => {

  const [allRestaurants, setAllRestaurants] = useState([])
  const [displayRestaurants, setDisplayRestaurants] = useState([])

  useEffect(() => {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    })
      .then(data => data.json())
      .then(result => {
        setAllRestaurants(result)
        setDisplayRestaurants(result)
      })
  }, [])

  return (
    <div className="App">
      <div className="App-div">
        <TableDisplay restaurants={displayRestaurants} />
      </div>
    </div>
  );
}

export default App;
