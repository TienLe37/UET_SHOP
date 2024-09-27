import formatPrice from "@utils/formatPrice";
import React from "react";

const OldNewPrice = ({ originalPrice, price }) => {
  return (
    <div className="product__price">
      <del className="product__ammount old-price">
        {formatPrice(originalPrice)}
      </del>
      <span className="product__ammount new-price">
        {" "}
        {formatPrice(price)}
      </span>
    </div>
  );
};

export default OldNewPrice;