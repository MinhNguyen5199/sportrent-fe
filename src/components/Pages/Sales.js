import React from 'react'
import { ProductOnSale } from '../HomePage/ProductOnSale';

 const Sales = () => {
  return (
    <div className="container-sm">
      <h1 className='mt-5'>Seasonal Sales</h1>
      <section className="services-section">
      <div className="services-content">
      <h3>Summer Sales</h3>
      
      <p className='our-services'>
        Explore our wide range of sports equipment for rent. Whether you're planning a mountain biking adventure or a day at the beach, we have you covered.
      </p>
      </div>
      </section>
      <div className="product-list">
      <ProductOnSale />

      </div>
      </div>
  )
}

export default Sales;