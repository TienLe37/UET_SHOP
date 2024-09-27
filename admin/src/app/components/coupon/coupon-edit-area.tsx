"use client";
import React from "react";
import CouponTable from "./coupon-table";
import useCouponSubmit from "@/hooks/useCouponSubmit";
import { useGetCouponQuery } from "@/redux/coupon/couponApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import GlobalImgUpload from "../category/global-img-upload";
import CouponFormField from "../brand/form-field-two";
import ProductType from "../products/add-product/product-type";

const CouponEditArea = ({ id }: { id: string }) => {
  const {
    errors,
    handleSubmit,
    isSubmitted,
    logo,
    register,
    setIsSubmitted,
    setLogo,
    setOpenSidebar,
    control,
    setSelectProductType,
    handleSubmitEditCoupon,
  } = useCouponSubmit();
  // get specific product
  const { data: coupon, isError, isLoading } = useGetCouponQuery(id);
  // decide to render
  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="fade" />;
  }
  if (!coupon && isError) {
    content = <ErrorMsg msg="Đã có lỗi xảy ra. Vui lòng tải lại!" />;
  }
  if (coupon && !isError) {
    content = (
      <>
        <div className="col-span-12 lg:col-span-4">
          <form onSubmit={handleSubmit((data) => handleSubmitEditCoupon(data,id))}>
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              {/* coupon image upload */}
              <div className="bg-white">
                <GlobalImgUpload
                  isSubmitted={isSubmitted}
                  setImage={setLogo}
                  image={logo}
                  setIsSubmitted={setIsSubmitted}
                  default_img={coupon.logo}
                />
              </div>
              {/* coupon image upload */}
              <CouponFormField
                register={register}
                errors={errors}
                name="Name"
                title="Tên mã giảm giá"
                isReq={true}
                default_val={coupon.title}
              />
              <CouponFormField
                register={register}
                errors={errors}
                name="Code"
                title="Mã"
                isReq={true}
                default_val={coupon.couponCode}
              />
              <CouponFormField
                register={register}
                errors={errors}
                name="endTime"
                isReq={true}
                type="date"
                title="Ngày hết hạn"
                default_val={coupon.endTime}
              />
              <CouponFormField
                register={register}
                errors={errors}
                name="discountPercentage"
                isReq={true}
                title="Chiết khấu"
                default_val={coupon.discountPercentage}
              />
              <CouponFormField
                register={register}
                errors={errors}
                name="minimumAmount"
                isReq={true}
                title="Tổng tiền tối thiểu"
                default_val={coupon.minimumAmount}
              />

              {/* product type */}
              <div className="mb-6">
                <p className="mb-0 text-base text-black">Loại sản phẩm</p>
                <div className="category-add-select select-bordered">
                  <ProductType
                    setSelectProductType={setSelectProductType}
                    control={control}
                    errors={errors}
                    default_value={coupon.productType}
                    options={[{value: coupon.productType, label: coupon.productType}]}
                  />
                </div>
              </div>
              {/* product type */}

              <button className="tp-btn px-7 py-2">Cập nhật</button>
            </div>
          </form>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {content}
        <div className="col-span-12 lg:col-span-8">
          {/* brand table start */}
          <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
            <div className="overflow-scroll 2xl:overflow-visible">
              <CouponTable cls="w-[975px] 2xl:w-full" setOpenSidebar={setOpenSidebar} />
            </div>
          </div>
          {/* brand table end */}
        </div>
      </div>
    </>
  );
};

export default CouponEditArea;
