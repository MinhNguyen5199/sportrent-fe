import React from 'react'
import {images} from '../../constants'
export const RelatedProduct = ({relatedProducts}) => {
  return (
    <>{relatedProducts.map((relatedProduct, index) => (
        <div class="col-4 relatedProduct" key={index}>
          <img
            src={`data:image/png;base64,${relatedProduct.product_Image}`}
            alt={images.ImageNotAvailable}
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = images.ImageNotAvailable; // set alternative image
            }}
          />
          <h4>{relatedProduct.product_Name}</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>${relatedProduct.price}</p>
        </div>
      ))}</>
  )
}
