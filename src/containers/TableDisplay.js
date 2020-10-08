import React from 'react'

const TableDisplay = (props) => {
  // sort restaurants alphabetically by name
  props.restaurants.sort((a, b) => {

    let nameA = a.name.toUpperCase()
    let nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })

  const restaurantRows = []
  props.restaurants.forEach((restaurant, i) => {
    restaurantRows.push(
      <tr key={`row${i}`}>
        <td>{restaurant.name}</td>
        <td>{restaurant.city}</td>
        <td>{restaurant.state}</td>
        <td>{restaurant.telephone}</td>
        <td>{restaurant.genre}</td>
      </tr>
    )
  })
  return (
    <table>
      <tbody className="table">
        <tr className="columnName">
          <td>Name</td>
          <td>City</td>
          <td>State</td>
          <td>Telephone</td>
          <td>Genres</td>
        </tr>
        {restaurantRows}
      </tbody>
    </table>
  )
}

export default TableDisplay