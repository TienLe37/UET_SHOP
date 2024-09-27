import React from "react";

const ProductDetailsCategories = ({ category }) => {
  const { name } = category;
  return (
    <div className="product__details-categories product__details-more">
      <p>Danh mục:</p> {" "}
      <span>
        <a href="#">{name}</a>
      </span>
    </div>
  );
};

export default ProductDetailsCategories;
