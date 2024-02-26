import React from "react";
const Pagination = ({ currentPage, rowsPerPage, totalRows, paginate }) => {
  const pageNumbers = [];

  let prevButton;
  let nextButton;

  if (currentPage > 1) {
    prevButton = (
      <a className="page-link " onClick={() => paginate(currentPage - 1)}>
        <i className="fa fa-angle-double-left"></i>
      </a>
    );
  } else {
    prevButton = (
      <a>
        <i className="fa fa-angle-double-left"></i>
      </a>
    );
  }

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (currentPage < pageNumbers.length) {
    nextButton = (
      <a className="page-link " onClick={() => paginate(currentPage + 1)}>
        <i className="fa fa-angle-double-right"></i>
      </a>
    );
  } else {
    nextButton = (
      <a>
        <i className="fa fa-angle-double-right"></i>
      </a>
    );
  }

  return (
    <div className="clearfix">
      <div className="hint-text">
        Showing <b>{rowsPerPage}</b> out of <b>{totalRows}</b> entries
      </div>
      <ul className="pagination">
        <li className={currentPage > 1 ? "page-item" : "page-item disabled"}>
          {prevButton}
        </li>

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage == number ? "active" : "page-item"}
          >
            <a onClick={() => paginate(number)} href="#" className="page-link ">
              {number}
            </a>
          </li>
        ))}

        <li
          className={
            currentPage < pageNumbers.length
              ? "page-item"
              : "page-item disabled"
          }
        >
          {nextButton}
        </li>
      </ul>
    </div>
  );
};
export default Pagination;