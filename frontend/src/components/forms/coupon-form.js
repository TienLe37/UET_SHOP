import React, { useRef } from "react";
import { useSelector } from "react-redux";

const CouponForm = ({handleCouponCode,couponRef}) => {
  const { coupon_info } = useSelector((state) => state.coupon);
  return (
    <form onSubmit={handleCouponCode}>
      {coupon_info?.couponCode ? (
        <p>Mã giảm giá đã được áp dụng</p>
      ) : (
        <p className="checkout-coupon">
          <input ref={couponRef} type="text" placeholder="Coupon Code" />
          <button className="tp-btn" type="submit">
            Áp dụng mã giảm giá
          </button>
        </p>
      )}
    </form>
  );
};

export default CouponForm;
