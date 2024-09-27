import formatPrice from "@utils/formatPrice";
import React from "react";

const ProductDetailsPrice = ({ price, discount }) => {
  return (
    <div className="product__details-price">
      {discount > 0 ? (
        <>
          <span className="product__details-ammount old-ammount">{formatPrice(price)}</span>
          <span className="product__details-ammount new-ammount">
            
            {formatPrice((Number(price) - (Number(price) * Number(discount)) / 100).toFixed(0))}
          </span>
          <span className="product__details-offer">-{discount}%</span>
        </>
      ) : (
        <>
          <span className="product__details-ammount new-ammount">{formatPrice(price)}</span>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPrice;
