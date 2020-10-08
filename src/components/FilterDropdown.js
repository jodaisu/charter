import React from 'react'

const FilterDropdown = (props) => {
  const onChangeFilter = props.type === 'state' ? props.setFilterState : props.setFilterGenre

  const obj = {}

  const handleOption = (e) => {
    if (e.currentTarget.value === 'all') {
      props.setDisplayRestaurants(props.restaurants)
    }
    else {
      onChangeFilter(e.currentTarget.value)
      props.setDisplayRestaurants(obj[e.currentTarget.value])
    }
  }

  if (props.type === 'state') {
    props.restaurants.forEach(restaurant => {
      if (obj[restaurant.state]) {
        obj[restaurant.state].push(restaurant)
      }
      else {
        obj[restaurant.state] = [restaurant]
      }
    })
  }
  else {
    props.restaurants.forEach(restaurant => {
      const splitArr = restaurant.genre.split(',')
      for (let genre of splitArr) {
        if (obj[genre]) {
          obj[genre].push(restaurant)
        }
        else {
          obj[genre] = [restaurant]
        }
      }
    })
  }

  const options = Object.keys(obj)

  options.sort((a, b) => {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  })

  const renderOptions = options.map((option, idx) => {
    return (
      <option key={`${props.type}-${idx}`} value={option}>{option}</option>
    )
  })

  return (
    <select className="FilterDropdown" onChange={handleOption}>
      <option value="all">All</option>
      {renderOptions}
    </select>
  )
}

export default FilterDropdown