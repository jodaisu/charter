import React, { useState } from 'react'
import Pagination from './Pagination'

const TableDisplay = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [restaurantsPerPage, setRestaurantsPerPage] = useState(10)

  const states = props.stateOn ? props.filterState : props.allRestaurants
  const genres = props.genreOn ? props.filterGenre : props.allRestaurants

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
  let renderArray = filterRestaurants(states, genres)

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

  const indexOfLastRestaurant = currentPage * restaurantsPerPage
  const indexOfFirstPost = indexOfLastRestaurant - restaurantsPerPage
  const currentRestaurants = restaurantRows.slice(indexOfFirstPost, indexOfLastRestaurant)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <table className="table">
        <thead>
          <tr className="columnName">
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Telephone</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {currentRestaurants}
        </tbody>
      </table>
      {props.loading == true ?
        <div className="loading">
          Loading...
          </div>
        : null}
      {restaurantRows.length == 0 && props.loading == false ?
        <div className="noResults">
          No results were found.
          </div>
        : null}
      <Pagination
        restaurantsPerPage={restaurantsPerPage}
        totalRestaurants={restaurantRows.length}
        paginate={paginate} />
    </>
  )
}

export default TableDisplay