import React, { useState } from "react";
import { RentalCalender } from "../RentalProducts/RentalCalender";
import { Link } from "react-router-dom";
import images from '../../constants/images'
import { motion } from "framer-motion";

const Banner = () => {
  const [numberOfDays, setNumberOfDays] = useState(1);

  const handleNumberOfDaysChange = (numberOfDays) => {
    setNumberOfDays(numberOfDays);
  };

  return (
    <>

      <div className="parallax img-fluid">
        <div className="overlay"></div>
        <div id="booking" className="section">
          <div className="section-center">
            <div className="container-sm">
              <div className="row">
                <div className="col-md-5 col-md-push-5" >
                  <div className="home-banner">
                    <p className="booking-header-with-background" data-text="SPORTS RENT">
                      SPORTS RENT
                    </p>
                    <div className="booking-cta">
                    <img src={images.circle} alt="circle_bg" className="overlay_circle" />
                      <motion.div
                        className="md:-mt-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                          hidden: { opacity: 0, x: -50 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <p className="booking-header">Best Rental In City</p>
                        <p >
                          Rent top-quality sports equipment in Calgary since 1982.
                          We offer a diverse selection of options, ranging from skis, snowboards,
                          and snowshoes to cross-country skis, rafts, bikes, and boats,
                          ensuring that your outdoor adventures are not only unforgettable
                          but also exceptionally well-equipped.
                        </p>
                        <Link className="" to={`/ShoppingCart`}>
                          <button type="button" className=" mt-2 mb-3 pl-5 pe-5 productBtn">
                            Explore
                          </button>
                        </Link>

                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7 col-md-7 home-circular-banner ">
                  <motion.div
                    initial={{ y: -1000 }} // Initial position outside the viewport
                    animate={{ y: 0 }} // Animate to the center of the screen
                    transition={{ duration: 1 }} // Animation duration
                    className=""
                  >  
                  <div className="circular-div">
                      <img src={images.Bicycle} alt="" className="banner" />
                    </div>
                  </motion.div>
                </div>
              </div>
              {/* Calender */}
              <div className="row">
              <div className="col-sm-1"></div>
                <div className="col-sm-10">
                  <div className=" rental__calender">
                    <RentalCalender onNumberOfDaysChange={handleNumberOfDaysChange} />
                  </div>
                </div>
              <div className="col-sm-1"></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
