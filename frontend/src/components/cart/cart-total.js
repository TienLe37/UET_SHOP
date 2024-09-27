import Link from "next/link";
import React from "react";
// internal
import useCartInfo from "@hooks/use-cart-info";
import formatPrice from "@utils/formatPrice";

const CartTotal = () => {
  const { total } = useCartInfo();
  return (
    <div className="cart-page-total">
      <h2>Tổng giỏ hàng</h2>
      <ul className="mb-20">
        <li>
          Tổng phụ <span>{formatPrice(total)}</span>
        </li>
        <li>
          Tổng cộng <span>{formatPrice(total)}</span>
        </li>
      </ul>
      <Link href="/checkout" className="tp-btn cursor-pointer">
        Tiến hành thanh toán
      </Link>
    </div>
  );
};

export default CartTotal;
