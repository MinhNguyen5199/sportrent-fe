import React, { useState, useEffect } from 'react';
import './CarouselBanner.css';

const slides = [
    {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_d1Ahsre-LF1-ysPPUmepDBXUwYjnghOuw&usqp=CAU',
        header: 'Ski Rental Stock Illustrations  368 Ski Rental Stock Illustrations and Vectors ',
        description: 'This is the first slide description.',
        buttonText: 'Shop Now',
    },
    {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1-X2Pjwv8eK9rmNgfs5uSHhASjJ0U4aqY_Q&usqp=CAU',
        header: 'Ski Rental Stock Illustrations  368 Ski Rental Stock Illustrations and Vectors ',
        description: 'This is the second slide description.',
        buttonText: 'Shop Now',
    },
    {
        imageUrl: 'https://www.eou.edu/outdoor/files/2011/10/Copy-of-Rental-Shop-Webpage-Banner-1024x321.jpg',
        header: 'Ski Rental Stock Illustrations 368 Ski Rental Stock Illustrations and Vectors ',
        description: 'This is the third slide description.',
        buttonText: 'Shop Now',
    },
    {
        imageUrl: 'https://storage.googleapis.com/tradeinn-images/images/landing-pages/TrekkINN.jpg',
        header: 'Ski Rental Stock Illustrations 368 Ski Rental Stock Illustrations and Vectors ',
        description: 'This is the fourth slide description.',
        buttonText: 'Shop Now',
    },
    {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl7NjcQTaxzipX3GoLD7fhk4K6Aa6kHQpq5Q&usqp=CAU',
        header: 'Ski Rental Stock Illustrations 368 Ski Rental Stock Illustrations and Vectors ',
        description: 'This is the fifth slide description.',
        buttonText: 'Shop Now',
    }
    // Add more slides here
];

export const CarouselBanners = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeDot, setActiveDot] = useState(0);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setActiveDot(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % slides.length;
            goToSlide(nextSlide);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    return (
        <div className="banner-slider">
            <div className="slide-container">
                {slides.map((slideData, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url(${slideData.imageUrl})`,
                            backgroundSize: '100% 300px', 
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        <div className="overlays"></div>
                        <div className="content">
                            <h1 className="carousel-header">{slideData.header}</h1>
                            <p className="description">{slideData.description}</p>
                            <button className="butt ">{slideData.buttonText}</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${activeDot === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};