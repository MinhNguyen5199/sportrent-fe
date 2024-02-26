import React, { useState, useEffect, useRef } from 'react';
import Loading from '../../Product/Loading';
import { images } from '../../../constants';
import { ProductQuantity } from '../ProductQuantity';
import { Link } from 'react-router-dom';
import publicService from '../../../Service/publicService';

export const ShoppingCartProduct = ({
  currentProducts,
  productCount,
  numberOfDays,
  setProductCount,
  handleAddToCart,
}) => {
  // Retrieving images 
  const [productImages, setProductImages] = useState({});
  const [carouselPositions, setCarouselPositions] = useState({});
  const [carouselWidths, setCarouselWidths] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState({});

  const slideWidth = 300;
  useEffect(() => {
    // Fetch the product data including the images from the server for each product
    Promise.all(currentProducts.map((product) => (
      publicService.getProductWithImages(product.id)
        .then((response) => ({
          ...product,
          images: response.data,
          carouselWidth: response.data.length * slideWidth, // Add carouselWidth to the product object
        }))
        .catch((error) => {
          console.error('Error fetching product images', error);
          return {
            ...product,
            image: [],
            carouselWidth: 0, // Set the carouselWidth to 0 if there was an error
          };
        })
    )))
      .then((updatedProducts) => {
        setProductImages(updatedProducts);
        // Update carouselWidths state with the calculated carouselWidth for each product
        const carouselWidthsData = updatedProducts.reduce((acc, product) => {
          acc[product.id] = product.carouselWidth;
          return acc;
        }, {});
        setCarouselWidths(carouselWidthsData);
      })
      .catch((error) => {
        console.error('Error fetching product images', error);
      });
    setLoading(false);
  }, []);


  const smallGridLink = document.querySelector('.smallGrid a');
  const largeGridLink = document.querySelector('.largeGrid a');

  const handleLargeGridClick = () => {

    if (smallGridLink && largeGridLink) {
      smallGridLink.classList.remove('active');
      largeGridLink.classList.add('active');
    }

    const productElements = document.querySelectorAll('.shopping_product');
    productElements.forEach((productElement) => {
      productElement.classList.add('large');
      setTimeout(() => {
        const infoLargeElement = productElement.querySelector('.info-large');
        if (infoLargeElement) {
          infoLargeElement.style.display = 'block';
        }
      }, 200);
    });
    setTimeout(() => {
      handleViewGalleryClick();
      const viewGalleryElements = document.querySelectorAll('.view_gallery');
      viewGalleryElements.forEach((viewGalleryElement) => {
        if (viewGalleryElement) {
          viewGalleryElement.dispatchEvent(new Event('click'));
        }
      }, 400);
    });
  };

  const handleSmallGridClick = () => {
    if (smallGridLink && largeGridLink) {
      smallGridLink.classList.add('active');
      largeGridLink.classList.remove('active');
    }

    const productElements = document.querySelectorAll('.shopping_product');
    productElements.forEach((productElement) => {
      productElement.classList.remove('large');

      const infoLargeElement = productElement.querySelector('.info-large');
      if (infoLargeElement) {
        infoLargeElement.style.display = 'none';
      }
      setTimeout(() => {
        const make3DElements = productElement.querySelectorAll('.make3D');
        make3DElements.forEach((element) => element.classList.remove('animate'));

        handleFlipBackClick();
        const flipBackElements = document.querySelectorAll('div.flip-back');
        flipBackElements.forEach((flipBackElement) => {
          if (flipBackElement) {
            flipBackElement.dispatchEvent(new Event('click'));
          }
        });
      }, 400);
    });


  };

  const handleProductHover = () => {
    const product = document.querySelectorAll('.shopping_product');

    product.forEach((item) => {
      const make3D = item.querySelector('.make3D');

      make3D.addEventListener('mouseover', () => {
        item.style.zIndex = '2';
        make3D.classList.add('animate');
        make3D.querySelector('div.carouselNext').classList.add('visible');
        make3D.querySelector('div.carouselPrev').classList.add('visible');
      });

      make3D.addEventListener('mouseout', () => {
        make3D.classList.remove('animate');
        item.style.zIndex = '10';
        make3D.querySelector('div.carouselNext').classList.remove('visible');
        make3D.querySelector('div.carouselPrev').classList.remove('visible');
      });
    });
  };

  const handleViewGalleryClick = () => {
    const product = document.querySelectorAll('.shopping_product');

    product.forEach((item) => {
      const viewGallery = item.querySelector('.view_gallery');

      viewGallery.addEventListener('click', () => {
        item.querySelector('div.carouselNext').classList.remove('visible');
        item.querySelector('div.carouselPrev').classList.remove('visible');
        item.querySelector('.make3D').classList.add('flip-10');

        setTimeout(() => {
          item.querySelector('.make3D').classList.remove('flip-10');
          item.querySelector('.make3D').classList.add('flip90');
          item.querySelector('.product-front').style.display = 'none';
          item.querySelector('.product-front div.shadow').style.display = 'none';
        }, 50);

        setTimeout(() => {
          item.querySelector('.make3D').classList.remove('flip90');
          item.querySelector('.make3D').classList.add('flip190');
          item.querySelector('.product-back').style.display = 'block';
          item.querySelector('.product-back div.shadow').style.display = 'block';
          item.querySelector('.product-back div.shadow').style.opacity = '0';

          setTimeout(() => {
            item.querySelector('.make3D').classList.remove('flip190');
            item.querySelector('.make3D').classList.add('flip180');
            item.querySelector('.make3D').querySelector('.cx').classList.add('s1');
            item.querySelector('.make3D').querySelector('.cy').classList.add('s1');

            setTimeout(() => {
              item.querySelector('.make3D').querySelector('.cx').classList.add('s2');
              item.querySelector('.make3D').querySelector('.cy').classList.add('s2');

            }, 100);

            setTimeout(() => {
              item.querySelector('.make3D').querySelector('.cx').classList.add('s3');
              item.querySelector('.make3D').querySelector('.cy').classList.add('s3');

            }, 200);

            item.querySelector('div.carouselNext').classList.add('visible');
            item.querySelector('div.carouselPrev').classList.add('visible');
          }, 100);
        }, 150);
      });
    });
  };

  const handleFlipBackClick = () => {
    const product = document.querySelectorAll('.shopping_product');

    product.forEach((item) => {
      const flipBack = item.querySelector('.flip-back');

      flipBack.addEventListener('click', () => {
        item.querySelector('.make3D').classList.remove('flip180');
        item.querySelector('.make3D').classList.add('flip190');

        setTimeout(() => {
          item.querySelector('.make3D').classList.remove('flip190');
          item.querySelector('.make3D').classList.add('flip90');

          item.querySelector('.product-back .shadow').style.opacity = '0';
          item.querySelector('.product-back, .product-back .shadow').style.display = 'none';
          item.querySelector('.product-front, .product-front .shadow').style.display = 'block';

        }, 50);
        setTimeout(() => {
          item.querySelector('.make3D').classList.remove('flip90');
          item.querySelector('.make3D').classList.add('flip-10');

          item.querySelector('.product-front .shadow').style.display = 'block';
          item.querySelector('.product-front .shadow').style.opacity = '1';

          setTimeout(() => {
            item.querySelector('.product-front .shadow').style.display = 'block';
            item.querySelector('.make3D').classList.remove('flip-10');
            item.querySelector('.make3D').querySelector('.cx').classList.remove('s1', 's2', 's3');
            item.querySelector('.make3D').querySelector('.cy').classList.remove('s1', 's2', 's3');
          }, 100);

        }, 150);
      });
    });
  };

  // Make Carousel

  const handleCarouselNextClick = (productId) => {
    setCarouselPositions((prevPositions) => {
      const currentPosition = prevPositions[productId] || 0;
      const carouselWidth = carouselWidths[productId] || 0; // Get the carouselWidth for the current product
      let newPosition = currentPosition - slideWidth;
      if (newPosition < -carouselWidth) {
        newPosition = 0;
      }
      return {
        ...prevPositions,
        [productId]: newPosition,
      };
    });
  };

  const handleCarouselPrevClick = (productId) => {
    setCarouselPositions((prevPositions) => {
      const currentPosition = prevPositions[productId] || 0;
      const carouselWidth = carouselWidths[productId] || 0; // Get the carouselWidth for the current product
      let newPosition = currentPosition + slideWidth;
      if (newPosition > 0) {
        newPosition = -carouselWidth + slideWidth;
      }
      return {
        ...prevPositions,
        [productId]: newPosition,
      };
    });
  };

  useEffect(() => {
    handleProductHover();
    handleViewGalleryClick();
    handleFlipBackClick();
  }, []);

  useEffect(() => {
    if (numberOfDays) {
      setProductCount((prevCounts) => {
        const updatedCounts = { ...prevCounts };

        for (const productId in updatedCounts) {
          updatedCounts[productId] = updatedCounts[productId] * numberOfDays;
        }

        return updatedCounts;
      });
    }
  }, [numberOfDays, setProductCount]);

  const formatTotalCost = (product, count) => {
    count = count || 1;

    let totalCost = 0.0;

    if (numberOfDays) {
      totalCost = count * product.price * numberOfDays;
    }

    return `$${totalCost.toFixed(2)}`;
  };
  const handelProductView = (product) => {
    const parameter = encodeURIComponent(JSON.stringify(product));
    window.location.href = `/productView/${parameter}`;
  };

  return (
    <>
      {loading && <Loading />}
      <div id="grid-menu">
        View:
        <ul>
          <li className="largeGrid" onClick={handleLargeGridClick}><a ></a></li>
          <li className="smallGrid" onClick={handleSmallGridClick}><a className="active"  ></a></li>
        </ul>
      </div>
      {currentProducts.map((product, index) => (
        <div className="shopping_product" onMouseOver={handleProductHover} onMouseOut={handleProductHover} key={index}>
          <div className="info-large">

            <h4>{product.product_Name}</h4>
            <div className="sku">
              PRODUCT SKU: <strong>{product.id}</strong>
            </div>
            <div className="price-big">
              <span>${product.price}</span> ${product.price}

            </div>
            <div className="Qty-Avail-container">
              <ProductQuantity
                product={product}
                productCount={productCount}
                setProductCount={setProductCount}
              />
              <p className="picks ">
                <span className="availability">
                  {product.available_quantity === 0 ? (
                    <p className="text-danger availability">Not available.</p>
                  ) : (
                    `${product.available_quantity} Rental's Available`
                  )}
                </span>
              </p>
            </div>
            <h3>Description</h3>
            <div className="sizes-large">
              <p>
                <span className="product-description">{product.description}</span>
              </p>
            </div>
            <h3>Key Highlights</h3>
            <div className="description_list">
              <ul>
                <li>
                  <i className="fa fa-check text-success"></i>  2 Adult capacity
                </li>
                <li>
                  <i className="fa fa-check text-success"></i> 545 lbs. maximum
                  weight capacity
                </li>
                <li>
                  <i className="fa fa-check text-success"></i> Maximum 10 Hp.
                  motor
                </li>


              </ul>
            </div> <div className="buttons">
              <div className="d-flex  buttons">
                {/* If product quantity is 0 disable the add to cart button  */}
                {product.available_quantity === 0 ? (

                  <button className="add-cart-large"
                    data-toggle="tooltip"
                    title="Add to cart"
                    onClick={() => {
                      handleAddToCart(product);
                      setShow((prevShow) => ({
                        ...prevShow,
                        [product.id]: !prevShow[product.id],
                      }));
                    }}
                    disabled={true}>
                    <i className="fa fa-shopping-cart">
                      Add to cart
                      <span className="pl-2">
                        {formatTotalCost(product, productCount[product.id])}
                      </span>
                    </i>
                  </button>
                ) : (
                  <button className="add-cart-large"
                    data-toggle="tooltip"
                    title="Add to cart"
                    onClick={() => {
                      handleAddToCart(product);
                      setShow((prevShow) => ({
                        ...prevShow,
                        [product.id]: !prevShow[product.id],
                      }));
                    }}

                  >
                    <i className="fa fa-shopping-cart">
                      Add to cart
                      <span className="pl-2">
                        {formatTotalCost(product, productCount[product.id])}
                      </span>
                    </i>
                  </button>
                )}
                <div className="">
                  <Link
                    onClick={() => {
                      handelProductView(product);
                    }}
                  >
                    <button className="view-product">
                      <i className="fa fa-eye" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* default product layout for front and back sides */}
          <div className="make3D">
            {/* product front side */}
            <div className="product-front">
              {show[product.id] && (
                <img
                  src={images.addedToCart}
                  alt=""
                  className="confirm_Icon"
                />
              )}
              <div className="shadow"></div>
              <img
                src={`data:image/png;base64,${product.product_Image}`}
                alt={images.ImageNotAvailable}
                className="product-front-image"
                loading='Lazy'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = images.ImageNotAvailable;
                }}
              />

              <div className="image_overlay"></div>
              {product.available_quantity === 0 ? (
                <button
                  className="add_to_cart"
                  data-toggle="tooltip"
                  title="Add to cart"
                  onClick={() => {
                    handleAddToCart(product);
                    setShow((prevShow) => ({
                      ...prevShow,
                      [product.id]: !prevShow[product.id],
                    }));
                  }}
                  disabled>
                  <i className="fa fa-shopping-cart">
                    Add to cart
                    <span className="pl-2">
                      {formatTotalCost(product, productCount[product.id])}
                    </span>
                  </i>
                </button>
              ) : (

                <button
                  className="add_to_cart"
                  data-toggle="tooltip"
                  title="Add to cart"
                  onClick={() => {
                    handleAddToCart(product);
                    setShow((prevShow) => ({
                      ...prevShow,
                      [product.id]: !prevShow[product.id],
                    }));
                  }}
                >
                  <i className="fa fa-shopping-cart">
                    Add to cart
                    <span className="pl-2">
                      {formatTotalCost(product, productCount[product.id])}
                    </span>
                  </i>
                </button>
              )}
              <div className="view_gallery" onClick={handleViewGalleryClick}>
                View gallery
              </div>
              <div className="stats">
                <div className="stats-container">
                  <div class="price-container">
                    <span className="product_price">
                      <span class="currency-symbol">$</span>{product.price.toFixed(2).split('.')[0]}
                      .<span class="price-cents">{product.price.toFixed(2).split('.')[1]}</span>
                    </span>
                  </div>
                  <span className={`product_name ${product.product_Name.length > 22 ? 'wrap-text' : ''}`}>
                    {product.product_Name}
                  </span>
                  <p>
                    <span>{product.category_Name}</span>
                  </p>
                  <div className="product-options">
                    <div className="Qty-Avail-container">
                      <ProductQuantity
                        product={product}
                        productCount={productCount}
                        setProductCount={setProductCount}
                      />
                      <p className="picks ">
                        <span className="availability">
                          {product.available_quantity === 0 ? (
                            <p className="text-danger availability"> Not available. </p>
                          ) : (
                            `${product.available_quantity} Rental's Available`
                          )}
                        </span>
                      </p>
                    </div>
                    <span> <strong>Description</strong></span>
                    <span className="product-description">{product.description}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* product back side displayed after clicking on the view button */}
            <div className="product-back">
              <div className="shadow"></div>
              <div className="carousel">
                <ul className="carousel-container"
                  style={{
                    width: carouselWidths[product.id] + 320 + "px",
                    left: carouselPositions[product.id] + "px",
                    transition: "all 300ms ease-out 0s",
                  }}>
                  <li >
                    <img
                      src={`data:image/png;base64,${product.product_Image}`}
                      alt={images.ImageNotAvailable}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = images.ImageNotAvailable;
                      }}
                    />
                  </li>
                  {/* Product images */}
                  {productImages[index]?.images?.map((image, imageIndex) => (
                    <li key={imageIndex}>
                      <img
                        src={`data:image/png;base64,${image.imageData}`}
                        alt={images.ImageNotAvailable}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = images.ImageNotAvailable;
                        }}
                      />
                    </li>
                  ))}
                </ul>

                {/* Carousel arrows */}
                <div className="arrows-perspective">
                  <div className="carouselPrev" onClick={() => handleCarouselPrevClick(product.id)}>
                    <div className="y"></div>
                    <div className="x"></div>
                  </div>
                  <div className="carouselNext" onClick={() => handleCarouselNextClick(product.id)}>
                    <div className="y"></div>
                    <div className="x"></div>
                  </div>
                </div>
              </div>
              <div className="flip-back" onClick={handleFlipBackClick}>
                <div className="cy"></div>
                <div className="cx "></div>
              </div>
            </div>
          </div>
        </div>
      ))}

    </>
  );
};
