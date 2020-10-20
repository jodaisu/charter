import React, { useState } from 'react'
import Pagination from './Pagination'

const TableDisplay = (props) => {

  const sortType = props.sort

  const states = props.stateOn ? props.filterState : props.allRestaurants
  const genres = props.genreOn ? props.filterGenre : props.allRestaurants

  const filterRestaurants = (list1, list2, isUnion = true) =>
    list1.filter(
      (set => a => isUnion === set.has(a.name))(new Set(list2.map(b => b.name)))
    );

  const filterSearch = () => {
    const query = props.query.toLowerCase()
    const queryArray = props.query.toLowerCase().split(' ')
    return renderArray.filter((item) => {
      // check if name, city, and genre matches query
      const name = item.name.toLowerCase()
      const nameArray = item.name.toLowerCase().split(' ')

      const city = item.city.toLowerCase()
      const genreArray = item.genre.toLowerCase().split(',')
      if (queryArray.length > 1) {
        for (let query of queryArray) {
          if (nameArray.includes(query)) {
            return true
          }
        }
      }
      if (name === query || city === query) return true
      if (nameArray.includes(query)) return true
      if (genreArray.includes(query)) return true
      return false
    })

  }
  // filter the array based on states and genre
  let renderArray = filterRestaurants(states, genres)

  // filter the array based on search query if present
  renderArray = props.query.length > 1 ? filterSearch() : renderArray


  // sort
  renderArray.sort((a, b) => {
    let nameA = a[sortType].toUpperCase()
    let nameB = b[sortType].toUpperCase()
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
    if (i % 2 === 0) {
      restaurantRows.push(
        <tr key={`row${i}`} className="even">
          <td className="first">{restaurant.name}</td>
          <td className="second">{restaurant.city}</td>
          <td className="third">{restaurant.state}</td>
          <td className="fourth">{restaurant.telephone}</td>
          <td className="fifth">{restaurant.genre}</td>
        </tr>
      )
    }
    else {
      restaurantRows.push(<tr key={`row${i}`} className="odd">
        <td className="first">{restaurant.name}</td>
        <td className="second">{restaurant.city}</td>
        <td className="third">{restaurant.state}</td>
        <td className="fourth">{restaurant.telephone}</td>
        <td className="fifth">{restaurant.genre}</td>
      </tr>)
    }

  })

  const indexOfLastRestaurant = props.currentPage * props.restaurantsPerPage
  const indexOfFirstPost = indexOfLastRestaurant - props.restaurantsPerPage
  const currentRestaurants = restaurantRows.slice(indexOfFirstPost, indexOfLastRestaurant)

  const paginate = (pageNumber) => props.setCurrentPage(pageNumber)

  const paginateLeft = () => {
    if (props.currentPage - 1 == 0) return
    return props.setCurrentPage(props.currentPage - 1)
  }
  const paginateRight = (numberOfPages) => {
    if (props.currentPage + 1 > numberOfPages) return
    return props.setCurrentPage(props.currentPage + 1)
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr className="columnName">
            <th className="first">Name</th>
            <th className="second">City</th>
            <th className="third">State</th>
            <th className="fourth">Telephone</th>
            <th className="fifth">Genres</th>
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
        restaurantsPerPage={props.restaurantsPerPage}
        totalRestaurants={restaurantRows.length}
        paginate={paginate}
        currentPage={props.currentPage}
        currentRestaurants={currentRestaurants.length}
        paginateLeft={paginateLeft}
        paginateRight={paginateRight}
      />
    </>
  )
}

export default TableDisplay