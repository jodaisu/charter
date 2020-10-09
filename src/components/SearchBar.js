import React, { useState, useRef } from 'react'

const SearchBar = (props) => {
  const [input, setInput] = useState('')
  const refInput = useRef()

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    props.setQuery(input)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      handleSubmit()
      refInput.current.blur()
    }
  }

  return (
    <span className="searchBar">
      <input
        type="text"
        ref={refInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      >
      </input>
      <button type="button" onClick={handleSubmit}>Search</button>
    </span>
  )
}

export default SearchBar