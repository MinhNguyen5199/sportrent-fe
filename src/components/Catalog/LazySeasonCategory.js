import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../constants";

const LazySeasonCategory = ({ category }) => {
  
  const renderProductBox = (categoryItem) => (
    <div className="product-box medium" key={categoryItem.category_id}>
      <Link to={`/shoppingCart/${categoryItem.category_id}`}>
        <img
          src={`data:image/png;base64,${categoryItem.category_Image}`}
          alt={images.ImageNotAvailable}
          className="product-box-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = images.ImageNotAvailable;
          }}
        />
      </Link>
      <div className="product-box-details">
        {categoryItem.category_Name} <span>{categoryItem.num_products}</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="app-content-field ">
        <div className="product-box medium">
          {renderProductBox(category[0])}
        </div>

        <div className="product-boxes">
          <div className="product-box-wrapper three">
            {[category[4], category[1], category[5], category[3]].map((categoryItem) =>
              renderProductBox(categoryItem)
            )}
          </div>

          <div className="product-box-wrapper two">
            {[category[2], category[6]].map((categoryItem) =>
              renderProductBox(categoryItem)
            )}
          </div>
        </div>
      </div>

      <div className="app-content-field second">
        <div className="product-box-wrapper">
          {category.slice(7, 16).map((categoryItem) =>
            renderProductBox(categoryItem)
          )}
        </div>
      </div>
    </div>
  );
};

export default LazySeasonCategory;
