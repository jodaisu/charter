import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import TableDisplay from './containers/TableDisplay'

const App = () => {

  const [allRestaurants, setAllRestaurants] = useState([])

  useEffect(() => {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    })
      .then(data => data.json())
      .then(result => {
        setAllRestaurants(result)
      })
  }, [])

  return (
    <div className="App">
      <div className="App-div">
        <TableDisplay restaurants={allRestaurants} />
      </div>
    </div>
  );
}

export default App;
