import React from 'react'

const Pagination = ({ restaurantsPerPage, totalRestaurants, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map(number => {
          return (
            <li key={`page${number}`} className="pageItem">
              <a onClick={() => paginate(number)} href="!#" className="pageLink">
                {number}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Pagination