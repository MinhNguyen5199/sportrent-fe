import React, { useState, useEffect } from 'react'

import { toast } from "react-toastify";
import publicService from '../../Service/publicService';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import Product from '../Product/Product';
import "../RentalProducts/Rentals.css";
// max number of product display on start
export const ProductOnSale = () => {

  const [productOnSale, setProductOnSale] = useState([]);

  useEffect(() => {
    publicService.getProductBySeason("Sales")
      .then((response) => {
        setProductOnSale(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded with an error status
          if (error.response.status === 500) {
            toast.error("Connection to the database has been lost");
          } else {
            toast.error("Something went wrong. Please refresh the page");
          }
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an error
          toast.error("An error occurred while making the request");
        }
      });
  }, []);

  const [productCount, setProductCount] = useState({});
  const [numberOfDays] = useState(1);

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handelAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: productCount[product.id] || 1,
        numberOfDays: numberOfDays,
      })
    );
  };
  const [next] = useState(12);


  return (
    <div>

      <Product
        products={productOnSale}
        productCount={productCount}
        numberOfDays={numberOfDays}
        setProductCount={setProductCount}
        handleAddToCart={handelAddToCart}
        productPerRow={next}
        // show={show}
        // setShow={setShow}
      />



    </div>
  )
}
