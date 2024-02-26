import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart } from "../../../redux/actions/cartActions";
import { addToCart } from "../../../redux/actions/cartActions";
import publicService from "../../../Service/publicService"
import { ShoppingCartProduct } from './ShoppingCartProduct';
import './style.css';
import "../Rentals.css";
import { RentalCalender } from "../RentalCalender";
import images from '../../../constants/images'
import { RentalCategory } from "../RentalCategory";
import Pagination from '../../Product/Pagination';
import { CarouselBanners } from "../../HomePage/CarouselBanners";


const productsPerPage = 12;
const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProductByCat(id);
  }, [id]);

  const getProductByCat = (id) => {
    if (id) {
      publicService
        .getProductByCat(id)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => { });
    } else {
      // get all product including category
      publicService
        .getProductByCategory()
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => { });
    }
  };

  const [productCount, setProductCount] = useState({});
  const [numberOfDays, setNumberOfDays] = useState(0);

  const handleNumberOfDaysChange = (numberOfDays) => {
    setNumberOfDays(numberOfDays);
  };

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

  const [next, setNext] = useState(productsPerPage);

  const handleMoreProduct = () => {
    setNext(next + productsPerPage);
  };



  // ******************* add cart to the side bar
  const { cart } = useSelector((state) => state.cart);
  const renderCartItems = () => {
    if (cart.length === 0) {
      return <span className="empty">No items in cart.</span>;
    }
    return <>
    
    <div id="checkout">
    <Link onClick={(event) => (window.location.href = "/cart")} >Checkout</Link>
    </div>

    {cart.map((item) => (
      <div key={item.id} className="cart-item">

        <div className="img-wrap">
          <img
            src={`data:image/png;base64,${item.product.product_Image}`}
            alt={images.ImageNotAvailable}
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = images.ImageNotAvailable; // set alternative image
            }}
          />
        </div>

        <span>{item.product.product_Name}</span>

        <strong> ${item ? item.amount.toFixed(2) : 0}</strong>

        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Qty: {item.quantity} */}

        <div className="cart-item-border"></div>
        <Link
          className="delete float-right"
          title="Delete"
          data-toggle="tooltip"
          onClick={() => dispatch(deleteFromCart(item))}
        >
          <div className="delete-item"></div>
        </Link>


      </div>

    ))}
    </>
  };

    // pagination for rental products
    const [currentPage, setCurrentPage] = useState(1);

  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  return (
    <div id="wrapper">
      <div className="cart-icon-top"></div>
      <div className="cart-icon-bottom"></div>
      {/* <div id="checkout">CHECKOUT</div> */}

      <div id="header">

        {/* <RentalBanner /> */}
        <CarouselBanners />

      </div>
      <div id="sidebar">
        <h3>CART</h3>
        <div id="cart">

          {renderCartItems()}
        </div>

        <h3>CATEGORIES</h3>
        <div className="checklist categories">
          <RentalCategory />
        </div>
      </div>

      <div id="grid-selector">
        <div className="row filter">
          <div className="col-lg-4 col-md-3 col-sm-3 mt-3 ml-3 ml-lg-0">

            Showing 1–{next} of {products.length} results
            {next < products?.length && (
              <button className=" ml-5 " onClick={handleMoreProduct}>
                Next &gt;&gt;&gt;
              </button>
            )}
          </div>
          <div className="col-lg-4 col-md-3 col-sm-3">
            <RentalCalender onNumberOfDaysChange={handleNumberOfDaysChange} />
          </div>
        </div>
      </div>
      <div id="grid">
        <ShoppingCartProduct
          currentProducts={currentProducts}
          productCount={productCount}
          numberOfDays={numberOfDays}
          setProductCount={setProductCount}
          handleAddToCart={handelAddToCart}
          show={show}
          setShow={setShow}
        />
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ShoppingCart;
