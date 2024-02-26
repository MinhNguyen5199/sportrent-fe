import React, { useState, useEffect } from "react";
import "./catalog.scss";
import { images } from "../../constants";
import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <li className="carouselCard">
      <Link to={`/shoppingCart/${props.cat_key}`}>
          
            <img
                src={`data:image/png;base64,${props.cat_Image}`}
                alt={images.ImageNotAvailable}
                className="Category-box-image"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = images.ImageNotAvailable;
                }}
            />
            <p>{props.cat_Name} ({ props.cat_quantity})</p>
       </Link>
        </li>
    );
};

const Category = ({ category }) => {
    const [moveClass, setMoveClass] = useState('');
    const [carouselItems, setCarouselItems] = useState(category);

    useEffect(() => {
        document.documentElement.style.setProperty('--num', carouselItems.length);
    }, [carouselItems]);

    const handleAnimationEnd = () => {
        if (moveClass === 'prev') {
            shiftNext();
        } else if (moveClass === 'next') {
            shiftPrev();
        }
        setMoveClass('');
    };

    const shiftPrev = () => {
        setCarouselItems((prevItems) => {
            return [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)];
        });
    };

    const shiftNext = () => {
        setCarouselItems((prevItems) => {
            return [...prevItems.slice(1), prevItems[0]];
        });
    };

    return (
        <div className="carouselWrapper module-wrapper">
            <div className="ui">
                <button onClick={() => setMoveClass('next')} className="prev">
                    <span className="material-icons">chevron_left</span>
                </button>
                <button onClick={() => setMoveClass('prev')} className="next">
                    <span className="material-icons">chevron_right</span>
                </button>
            </div>
            <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousels`}>
                {carouselItems.map((item) => (
                    <Card
                        cat_key={item.category_id}
                        cat_Image={item.category_Image}
                        cat_Name={item.category_Name}
                        cat_quantity={item.num_products}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Category;

