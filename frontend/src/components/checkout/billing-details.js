import ErrorMessage from "@components/error-message/error";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// internal

const BillingDetails = ({ register, errors }) => {
  const {user} = useSelector(state => state.auth);
  // checkout form list
  function CheckoutFormList({
    col,
    label,
    type = "text",
    placeholder,
    isRequired = true,
    name,
    register,
    error,
    defaultValue,
  }) {
    return (
      <div className={`col-md-${col}`}>
        <div className="checkout-form-list">
          {label && (
            <label>
              {label} {isRequired && <span className="required">*</span>}
            </label>
          )}
          <input
            {...register(`${name}`, {
              required: `${label} là bắt buộc!`,
            })}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue ? defaultValue : ""}
          />
          {error && <ErrorMessage message={error} />}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
      <CheckoutFormList
          name="lastName"
          col="12"
          label="Họ "
          placeholder="Họ"
          register={register}
          error={errors?.lastName?.message}
        />
        <CheckoutFormList
          name="firstName"
          col="12"
          label="Tên"
          placeholder="Tên"
          register={register}
          error={errors?.firstName?.message}
          defaultValue={user?.name}
        />
        <CheckoutFormList
          name="address"
          col="12"
          label="Địa chỉ"
          placeholder="Địa chỉ"
          register={register}
          error={errors?.address?.message}
        />
        <CheckoutFormList
          col="12"
          label="Thành phố"
          placeholder="Thành phố"
          name="city"
          register={register}
          error={errors?.city?.message}
        />
        <CheckoutFormList
          col="6"
          label="Quốc gia"
          placeholder="Quốc gia"
          name="country"
          register={register}
          error={errors?.country?.message}
        />
        <CheckoutFormList
          col="6"
          label="Mã bưu chính"
          placeholder="Mã bưu chính"
          name="zipCode"
          register={register}
          error={errors?.zipCode?.message}
        />
        <CheckoutFormList
          col="6"
          type="email"
          label="Địa chỉ Email"
          placeholder="Địa chỉ Email"
          name="email"
          register={register}
          error={errors?.email?.message}
          defaultValue={user?.email}
        />
        <CheckoutFormList
          name="contact"
          col="6"
          label="Số điện thoại"
          placeholder="Số điện thoại"
          register={register}
          error={errors?.contact?.message}
        />

        <div className="order-notes">
          <div className="checkout-form-list">
            <label>Ghi chú đơn hàng</label>
            <textarea
              id="checkout-mess"
              cols="30"
              rows="10"
              placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng."
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingDetails;
