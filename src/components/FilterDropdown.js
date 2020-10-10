import React from 'react'

const FilterDropdown = (props) => {
  const onChangeFilter = props.type === 'state' ? props.setFilterState : props.setFilterGenre
  const toggleCheck = props.type === 'state' ? props.setStateOn : props.setGenreOn
  const isChecked = props.type === 'state' ? props.stateOn : props.genreOn

  const filterObj = {}

  const handleOption = (e) => {
    if (e.currentTarget.value === 'all') {
      onChangeFilter(props.restaurants)
    }
    else {
      onChangeFilter(filterObj[e.currentTarget.value])
    }
  }

  const handleCheck = () => {
    isChecked ? toggleCheck(false) : toggleCheck(true)
  }

  if (props.type === 'state') {
    props.restaurants.forEach(restaurant => {
      if (filterObj[restaurant.state]) {
        filterObj[restaurant.state].push(restaurant)
      }
      else {
        filterObj[restaurant.state] = [restaurant]
      }
    })
  }
  else {
    props.restaurants.forEach(restaurant => {
      const splitArr = restaurant.genre.split(',')
      for (let genre of splitArr) {
        if (filterObj[genre]) {
          filterObj[genre].push(restaurant)
        }
        else {
          filterObj[genre] = [restaurant]
        }
      }
    })
  }

  const options = Object.keys(filterObj)

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
    <>
      <select className="FilterDropdown" onChange={handleOption} disabled={!isChecked}>
        <option value="all">All</option>
        {renderOptions}
      </select>
      <input checked={isChecked} type="checkbox" onChange={handleCheck}></input>
    </>
  )
}

export default FilterDropdown