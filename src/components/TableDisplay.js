import React from 'react'

const TableDisplay = (props) => {

  const filterRestaurants = (list1, list2, isUnion = true) =>
    list1.filter(
      (set => a => isUnion === set.has(a.name))(new Set(list2.map(b => b.name)))
    );

  const filterSearch = () => {
    const query = props.query.toLowerCase()
    return renderArray.filter((item) => {
      // check if name, city, and genre matches query
      const name = item.name.toLowerCase()
      const city = item.city.toLowerCase()
      const genreArray = item.genre.toLowerCase().split(',')

      if (name === query || city === query) return true
      if (genreArray.includes(query)) return true
      return false
    })

  }
  // filter the array based on states and genre
  let renderArray = filterRestaurants(props.filterState, props.filterGenre)

  // filter the array based on search query if present
  renderArray = props.query.length > 1 ? filterSearch() : renderArray

  renderArray.sort((a, b) => {
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

  renderArray.forEach((restaurant, i) => {
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