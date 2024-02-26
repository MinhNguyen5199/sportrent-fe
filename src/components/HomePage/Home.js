import React from "react";
import Summer from "../Catalog/Summer";
import Winter from "../Catalog/Winter";
import HomeBanner from "./HomeBanner";
import Banner from "./Banner";
import "./Home.css";
import { RentalProcess } from "./RentalProcess";
import { ProductOnSale } from "./ProductOnSale";
import TopSaleProduct from "./FeaturedProduct";

const Home = () => {
  return (
    <>
    <div className="landingPage">
      <HomeBanner />
      
      
      <div className="container-sm">
      <div className="catalog_header">
          <p className="lead ">
            Discover all the essentials
            <strong className="text-primary">
              &nbsp;for your upcoming adventure right here.
            </strong>
          </p>
        
        </div>
      <div className="home-rental-Process-desktop">
       <h1 className="ad-header ">How it works</h1>
     <p className="step-desc">Rent with following 5 working steps</p>
        <RentalProcess  />
      </div>
      <h1 className="ad-header ">Explore Popular Category</h1>
      
          <div className="row mt-2 ">
            <div className="col-md-12 col-md-offset-2">
              <div className="tabs">
                <ul
                  id="myTab"
                  role="tablist"
                  className="nav nav-tabs nav-pills"
                >
                  <li className="nav-item">
                    <a
                      id="summer-tab"
                      data-toggle="tab"
                      href="#summer"
                      role="tab"
                      aria-controls="summer"
                      aria-selected="true"
                      className="nav-link nav-style text-uppercase font-weight-bold active"
                    >
                      Summer
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      id="winter-tab"
                      data-toggle="tab"
                      href="#winter"
                      role="tab"
                      aria-controls="winter"
                      aria-selected="false"
                      className="nav-link nav-style border-0 text-uppercase font-weight-bold"
                    >
                      Winter
                    </a>
                  </li>
                  <li className="nav-item border-0">
                    <a
                      id="Commercial-tab"
                      data-toggle="tab"
                      href="#Commercial"
                      role="tab"
                      aria-controls="Commercial"
                      aria-selected="false"
                      className="nav-link nav-style border-0 text-uppercase font-weight-bold "
                      disabled={true}
                    >
                      Commercial
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        
        <div id="myTabContent" className="tab-content  ">
          <div
            id="summer"
            role="tabpanel"
            aria-labelledby="summer-tab"
            className="tab-pane fade px-2 py-1 show active"
          >
            <Summer />
          </div>
          <div
            id="winter"
            role="tabpanel"
            aria-labelledby="winter-tab"
            className="tab-pane fade px-2 py-1"
          >
            <Winter />
          </div>
          <div
            id="fall"
            role="tabpanel"
            aria-labelledby="fall-tab"
            className="tab-pane fade px-2 py-1"
            disabled
          >
            Fall Sale
          </div>
        </div>
        <div className="mt-4">
          <h1 className="ad-header">Just for you</h1>
          <div className="products-container ">
            <Banner />
          </div>
        </div>
        <h1 className="ad-header mt-5">Top ranking</h1>
        <div className="grid-container mb-3">
          <TopSaleProduct />
        </div>
        <h1 className="ad-header mt-5">September Fall Sale 2023</h1>
        <div className="grid-container mb-3">
          <ProductOnSale />
        </div>
        
        <div className="home-rental-Process-mobile">
          <RentalProcess />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
