import React, { useState, useRef } from 'react'

const SearchBar = (props) => {
  const [input, setInput] = useState('')
  const refInput = useRef()

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    props.setCurrentPage(1)
    props.setQuery(input)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {

      e.preventDefault()
      handleSubmit()
      refInput.current.blur()
    }
  }

  const handleClear = () => {
    props.setQuery('')
    refInput.current.value = ''
  }

  return (
    <span className="searchBar">
      <input
        className="search"
        type="text"
        ref={refInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      >
      </input>
      <button className="buttons" type="button" onClick={handleSubmit}>Search</button>
      <button className="buttonClear" type="button" onClick={handleClear}>Clear</button>
    </span>
  )
}

export default SearchBar