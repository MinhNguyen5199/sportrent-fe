import React from 'react';
import { motion } from 'framer-motion';
import { FaCartArrowDown, FaUser, FaCreditCard, FaCar, FaUndo, FaCalendarMinus, FaTruckPickup } from 'react-icons/fa';
import './Home.css';

export const RentalProcess = () => {
  const steps = [
    {
      icon: <FaCalendarMinus />,
      header: 'Rental Period',
      desc: 'Choose your Pick-up and Return Data and Time to book your rental.',
    },
    {
      icon: <FaCartArrowDown />,
      header: 'Add Product to Cart',
      desc: 'Select your choice of rental product and add it to the cart.',
    },
    {
      icon: <FaCreditCard />,
      header: 'Process your Payment',
      desc: 'You can make your payment online or in person at the store after you make the reservation.',
    },
    {
      icon: <FaTruckPickup />,
      header: 'Pick up rental',
      desc: 'Your rental is ready; it`s time to pick up from the store.',
    },
    {
      icon: <FaUndo />,
      header: 'Return Rental',
      desc: 'Time to return your rental on time to avoid any extra charges at the store.',
    },
  ];

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className='rental-process'
        initial='hidden'
        animate='visible'
        variants={container}
      >
        <div className='step-grid '>
          {steps.map((step, index) => (
            <motion.div className='row step' variants={stepVariants} key={index}>

              <div className=' step-icon p-3'>{step.icon}</div>
              <div className="">
                <h5 className='step-header'>{step.header}</h5>
                <div className='step-desc '>{step.desc}</div>
                </div>
            </motion.div>
          ))}

        </div>
      </motion.div>
<div className='startBookBtn'>
      <button type="button" className=" mt-2 productBtn" fdprocessedid="flhmhg">
          Start Booking</button>
</div>
    </>
  );
};
