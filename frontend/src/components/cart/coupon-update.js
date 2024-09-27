import React from "react";

const CouponUpdateCart = () => {
  return (
    <div className="coupon-all">
      <div className="coupon">
        <input
          id="coupon_code"
          className="input-text"
          name="coupon_code"
          placeholder="Coupon code"
          type="text"
        />
        <button
          className="tp-btn tp-btn-black"
          name="apply_coupon"
          type="submit"
        >
          Sử dụng mã giảm giá
        </button>
      </div>
      <div className="coupon2">
        <button
          className="tp-btn tp-btn-black"
          name="update_cart"
          type="submit"
        >
          Cập nhật giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default CouponUpdateCart;
