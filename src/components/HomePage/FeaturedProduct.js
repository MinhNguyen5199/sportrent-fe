import React, { useState, useEffect } from "react";
import ProductService from "../../Service/publicService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { ShoppingCartProduct } from "../RentalProducts/ShoppingCart/ShoppingCartProduct";

const productPerRow = 8;

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState({});
  const [numberOfDays, setNumberOfDays] = useState(0);

  // Select featured products to display
  const featuredProduct = products.slice(0, productPerRow);

  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");

  useEffect(() => {
    getProduct();
    calculateNumberOfDays(startDate, endDate);
  }, []);

  // Fetch product data
  const getProduct = () => {
    ProductService.getProduct()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  };

  const dispatch = useDispatch();

  // Add product to cart
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: productCount[product.id] || 1,
        numberOfDays: numberOfDays,
      })
    );
  };

  
  useEffect(() => {
    if (startDate && endDate) {
      setNumberOfDays(calculateNumberOfDays(startDate, endDate));
    }
  }, [startDate, endDate]);

  // Calculate the number of days between two dates
  const calculateNumberOfDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = Math.abs(endDate - startDate);
    const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return numberOfDays;
  };

  return (
    <div className="row feature-products">
      <div className="">
        <ShoppingCartProduct
          currentProducts={featuredProduct}
          productCount={productCount}
          numberOfDays={numberOfDays}
          setProductCount={setProductCount}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default FeaturedProduct;
