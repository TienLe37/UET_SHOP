import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
// internal
import EmptyCart from "@components/common/sidebar/cart-sidebar/empty-cart";
import SingleCompare from "./single-compare";

const CompareArea = () => {
  const { compare } = useSelector((state) => state.compare);
  return (
    <section className="cart-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {compare.length > 0 && (
              <form onSubmit={e => e.preventDefault()}>
                <div className="table-content table-responsive">
                  <div className="tp-continue-shopping">
                    <p>
                      <Link href="/shop">
                        Tiếp tục mua hàng<i className="fal fa-reply"></i>
                      </Link>
                    </p>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Ảnh</th>
                        <th className="cart-product-name">Tên sản phẩm</th>
                        <th className="product-price">Giá mỗi sản phẩm</th>
                        <th className="product-quantity">Số lượng</th>
                        <th className="product-subtotal">Tổng công</th>
                        <th className="product-remove">Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compare.map((item, i) => (
                        <SingleCompare key={i} item={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="tp-compare-btn mt-50">
                      <Link href="/cart" className="tp-btn tp-btn-black">
                        Đến giỏ hàng
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            )}
            {compare.length === 0 && <EmptyCart />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareArea;
