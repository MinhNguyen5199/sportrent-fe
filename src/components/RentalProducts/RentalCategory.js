import React, { useState, useEffect } from "react";
import publicService from "../../Service/publicService";
import "./RentalFilter.css"

export const RentalCategory = () => {
  // retrieve All categories
  const [category, setCategory] = useState([]);
  const [numRows, setNumRows] = useState(8); // state variable for number of rows to display

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    publicService
      .getCategory()
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
console.log(category)
  const handleLoadMore = () => {
    setNumRows(numRows + 10); // show next 10 rows
  };

  // Separate categories into summer and winter
  const summerCategories = category.filter(category => category.season === 'Summer');
  const winterCategories = category.filter(category => category.season === 'Winter');

  return (
    <>
      <p className="category-header text-black">Summer Category</p>
      <ul>
        {summerCategories.slice(0, numRows).map((summerCategory, index) => (
          <a
            href={`/shoppingCart/${summerCategory.category_id}`}
            className=""
            key={index}
          >
            <li>
              {summerCategory.category_Name}
              <span className="float-right">{summerCategory.num_products}</span>
            </li>
          </a>
        ))}
        {summerCategories.length > numRows && ( // show Load More button if there are more categories to display
          <li className="category-loadMore text-end" onClick={handleLoadMore}>
            More
          </li>
        )}
      </ul>

      {/* Winter Category */}
      <p className="text-black category-header">Winter Category</p>
      <ul>
        {winterCategories.slice(0, numRows).map((winterCategory, index) => (
          <li key={index}>
            <a
              href={`/shoppingCart/${winterCategory.category_id}`}
              className=""
            >
              {winterCategory.category_Name}
              <span className="float-right">{winterCategory.num_products}</span>
            </a>
          </li>
        ))}
        {winterCategories.length > numRows && ( // show Load More button if there are more categories to display
          <li className="category-loadMore text-end" onClick={handleLoadMore}>
            Load More
          </li>
        )}
      </ul>
    </>
  );
};
