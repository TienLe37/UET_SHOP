"use client";
import React from "react";
import useProductSubmit from "@/hooks/useProductSubmit";
import DescriptionTextarea from "./description-textarea";
import OfferDatePicker from "./offer-date-picker";
import ProductTypeBrand from "./product-type-brand";
import AdditionalInformation from "./additional-information";
import ProductVariants from "./product-variants";
import ProductImgUpload from "./product-img-upload";
import ProductCategory from "../../category/product-category";
import Tags from "./tags";
import FormField from "../form-field";
import Colors from "./colors";

const ProductSubmit = () => {
  const {
    handleSubmit,
    handleSubmitProduct,
    register,
    errors,
    tags,
    setTags,
    control,
    setCategory,
    setParent,
    setChildren,
    setImg,
    img,
    setBrand,
    isSubmitted,
    relatedImages,
    setRelatedImages,
    setColors,
    colors,
  } = useProductSubmit();

  console.log('related image', relatedImages)
  return (
    <form onSubmit={handleSubmit(handleSubmitProduct)}>
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* left side */}
        <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <h4 className="text-[22px]">Thông tin chi tiết</h4>
            <FormField
              title="Tên sản phẩm"
              nameField="title"
              isRequired={true}
              placeHolder="Nhập tên sản phẩm"
              register={register}
              errors={errors}
            />
            <DescriptionTextarea register={register} errors={errors} />
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
              <FormField
                title="Giá"
                nameField="price"
                isRequired={true}
                placeHolder="Giá sản phẩm"
                bottomTitle="Đặt giá sản phẩm.(VNĐ)"
                type="number"
                register={register}
                errors={errors}
              />
              <FormField
                title="Mã sản phẩm"
                nameField="sku"
                isRequired={true}
                placeHolder="Mã sản phẩm"
                bottomTitle="Nhập mã sản phẩm."
                register={register}
                errors={errors}
              />
              <FormField
                title="Số lượng sản phẩm"
                nameField="quantity"
                isRequired={true}
                placeHolder="Số lượng sản phẩm"
                  bottomTitle="Nhập số lượng sản phẩm."
                type="number"
                register={register}
                errors={errors}
              />
              <FormField
                title="Giảm giá"
                nameField = "discount"
                type="number"
                isRequired={false}
                placeHolder="Giảm giá"
                bottomTitle="Đặt giảm giá cho sản phẩm."
                register={register}
                errors={errors}
              />
            </div>
          </div>

          {/* product type and brands start */}
          <ProductTypeBrand
            register={register}
            errors={errors}
            control={control}
            setSelectBrand={setBrand}
          />
          {/* product type and brands end */}

          {/* product variations start */}
          <ProductVariants
            isSubmitted={isSubmitted}
            setImageURLs={setRelatedImages}
            relatedImages={relatedImages}
          />
          {/* product variations end */}
        </div>

        {/* right side */}
        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <ProductImgUpload
            imgUrl={img}
            setImgUrl={setImg}
            isSubmitted={isSubmitted}
          />

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Danh mục cho sản phẩm</p>
            {/* category start */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <ProductCategory
                setCategory={setCategory}
                setParent={setParent}
                setChildren={setChildren}
              />
            </div>
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Tag cho sản phẩm</p>
            {/* tags start */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <Tags tags={tags} setTags={setTags} />
            </div>
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Màu sản phẩm</p>
            {/* tags start */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <Colors colors={colors} setColors={setColors} />
            </div>
          </div>
        </div>
      </div>
      <button className="tp-btn px-5 py-2 mt-5" type="submit">
        Thêm sản phẩm
      </button>
    </form>
  );
};

export default ProductSubmit;
