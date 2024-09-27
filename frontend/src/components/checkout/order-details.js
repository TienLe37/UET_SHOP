import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// internal
import useCartInfo from "@hooks/use-cart-info";
import ErrorMessage from "@components/error-message/error";
import formatPrice from "@utils/formatPrice";

const OrderDetails = ({
  register,
  errors,
  handleShippingCost,
  cartTotal,
  shippingCost,
  discountAmount,
}) => {
  const { total } = useCartInfo();

  return (
    <React.Fragment>
      <tr className="cart-subtotal">
        <th>Tổng giá trị giỏ hàng</th>
        <td className="text-end">
          <span className="amount text-end">{formatPrice(total)}</span>
        </td>
      </tr>
      <tr className="shipping">
        <th>Phí vận chuyển</th>
        <td className="text-end">
          <ul>
            <li>
              <input
                {...register(`shippingOption`, {
                  required: `Phải chọn phương thức vận chuyển`,
                })}
                id="flat_shipping"
                type="radio"
                name="shippingOption"
              />
              <label
                onClick={() => handleShippingCost(50000)}
                htmlFor="flat_shipping"
              >
                <span className="amount">Trong ngày: {formatPrice(50000)}</span>
              </label>
              <ErrorMessage message={errors?.shippingOption?.message} />
            </li>

            <li>
              <input
                {...register(`shippingOption`, {
                  required: `Phải chọn phương thức vận chuyển`,
                })}
                id="free_shipping"
                type="radio"
                name="shippingOption"
              />
              <label
                onClick={() => handleShippingCost(20000)}
                htmlFor="free_shipping"
              >
                <span className="amount">Trong tuần: {formatPrice(20000)}</span>

              </label>
              <ErrorMessage message={errors?.shippingOption?.message} />
            </li>
          </ul>
        </td>
      </tr>

      <tr className="shipping">
        <th>Tổng phụ</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPrice(total)}</span>
          </strong>
        </td>
      </tr>

      <tr className="shipping">
        <th>Phí vận chuyển</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPrice(shippingCost)}</span>
          </strong>
        </td>
      </tr>

      <tr className="shipping">
        <th>Khấu trừ</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPrice(discountAmount)}</span>
          </strong>
        </td>
      </tr>

      <tr className="order-total">
        <th>Tổng cộng</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPrice(cartTotal)}</span>
          </strong>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default OrderDetails;
