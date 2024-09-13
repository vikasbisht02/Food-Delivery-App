import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeToCart, url } = useContext(StoreContext);

  return  (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="food-image" className="food-item-image" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="plus-button"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeToCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="add-icon"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating-starts" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">&#8377;{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
