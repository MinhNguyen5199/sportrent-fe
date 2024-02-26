
import React from 'react';
 const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className='paginate'>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="#"
                className={number === currentPage ? "page-link active" : "page-link"}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default Pagination;