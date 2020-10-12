import React from 'react'

const Pagination = ({ restaurantsPerPage, totalRestaurants, paginate, paginateLeft, paginateRight }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul className="pagination">
        <li>
          <a onClick={paginateLeft} href="!#" className="leftArrow">
            &lt;
          </a>
        </li>
        {pageNumbers.map(number => {
          return (
            <li key={`page${number}`} className="pageItem">
              <a onClick={() => paginate(number)} href="!#" className="pageLink">
                {number}
              </a>
            </li>
          )
        })}
        <li>
          <a onClick={() => paginateRight(pageNumbers.length)} href="!#" className="leftArrow">
            &gt;
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination