import React, { useState } from "react";
import PriceItem from "./price-item";

// price items
const price_items = [
  { id: "one", min: 100000, max: 1000000 },
  { id: "two", min: 1000000, max: 3000000 },
  { id: "three", min: 3000000, max: 9999999 },
  { id: "four", max: 10000000 },
];

const ShopPrice = () => {

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="price__widget">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#price_widget_collapse"
          aria-expanded="true"
          aria-controls="price_widget_collapse"
        >
          Giá 
        </button>
      </h2>
      <div
        id="price_widget_collapse"
        className="accordion-collapse collapse show"
        aria-labelledby="price__widget"
        data-bs-parent="#shop_price"
      >
        <div className="accordion-body">
          <div className="shop__widget-list">
            {price_items.map((item, i) => (
              <PriceItem
                key={i}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPrice;
