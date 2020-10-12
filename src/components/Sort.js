import React from 'react'

const Sort = ({ setSort }) => {

  const handleSort = (e) => {
    setSort(e.currentTarget.value)
  }

  return (
    <span className="sort">
      Sort by:
      <select className="dropdown" onChange={handleSort}>
        <option value="name">Name</option>
        <option value="state">State</option>
      </select>
    </span>
  )
}

export default Sort