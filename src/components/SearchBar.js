import React, { useState } from 'react'

const SearchBar = (props) => {
  const [input, setInput] = useState('')

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    console.log(input)
    props.setQuery(input)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <span className="searchBar">
      <input
        type="text"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      >
      </input>
      <button type="button" onClick={handleSubmit}>Search</button>
    </span>
  )
}

export default SearchBar