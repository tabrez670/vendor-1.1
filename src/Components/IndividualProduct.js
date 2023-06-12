import React from "react";
import "../Components/styles/IndividualProduct.css";

export const IndividualProduct = ({ individualProduct, addToCart }) => {
    const handleAddToCart = () => {
        addToCart(individualProduct);
        console.log(individualProduct);
    };
    return (
        <div className="product">
            <div className="product-img">
                <img
                    id="prod-img"
                    src={individualProduct.url}
                    alt="product-img"
                />
            </div>
            <div className="product-text title" id="titlecard">
                {individualProduct.title}
            </div>
            <div className="product-text description">
                {individualProduct.description}
            </div>
            <div className="product-text price" id="product-text">
                ₹ {individualProduct.price} / kg
            </div>
            <div className="product-text price" id="product-text">
                {individualProduct.category} 
            </div>
            <div
                className="btn btn-danger btn-md cart-btn"
                id="viewbtn"
                onClick={handleAddToCart}
            >
                View Product
            </div>
            {/* <div>
              
            </div> */}
        </div>
    );
};
