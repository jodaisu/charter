import React from 'react'

const TableDisplay = (props) => {

  // Generic helper function that can be used for the three operations:        
  const filter = (list1, list2, isUnion = true) =>
    list1.filter(
      (set => a => isUnion === set.has(a.name))(new Set(list2.map(b => b.name)))
    );

  // Following functions are to be used:
  // const inBoth = (list1, list2) => operation(list1, list2, true)

  const array = filter(props.filterState, props.filterGenre)
  console.log(array)


  array.sort((a, b) => {
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

  array.forEach((restaurant, i) => {
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