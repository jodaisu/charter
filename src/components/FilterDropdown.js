import React from 'react'

const FilterDropdown = (props) => {
  // get all unique states
  const stateObj = {}
  if (props.type === 'state') {
    props.restaurants.forEach(restaurant => {
      if (stateObj.hasOwnProperty(restaurant.state)) {
        stateObj[restaurant.state].push(restaurant)
      }
      else {
        stateObj[restaurant.state] = [restaurant]
      }
    })
  }
  else {
    props.restaurants.forEach(restaurant => {
      if (stateObj.hasOwnProperty(restaurant.genre)) {
        stateObj[restaurant.genre].push(restaurant)
      }
      else {
        stateObj[restaurant.genre] = [restaurant]
      }
    })
  }



  const states = Object.keys(stateObj)

  states.sort((a, b) => {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  })

  const renderStates = states.map((state, idx) => {
    return (
      <option value={state}>{state}</option>
    )
  })

  return (
    <select className="FilterDropdown">
      <option value="all">All</option>
      {renderStates}
    </select>
  )
}

export default FilterDropdown