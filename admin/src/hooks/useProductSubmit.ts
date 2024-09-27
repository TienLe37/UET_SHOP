"use client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useAddProductMutation, useEditProductMutation } from "@/redux/product/productApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { IAddProduct } from "@/types/product-type";

type IBCType = {
  name: string;
  id: string;
};

const useProductSubmit = () => {
  const [img, setImg] = useState<string>("");
  const [relatedImages, setRelatedImages] = useState<string[]>([]);
  const [brand, setBrand] = useState<IBCType>({ name: '', id: '' });
  const [category, setCategory] = useState<IBCType>({ name: '', id: '' });
  const [parent, setParent] = useState<string>('');
  const [children, setChildren] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);

  const router = useRouter();


  // useAddProductMutation
  const [addProduct, { data: addProductData, isError, isLoading }] =
    useAddProductMutation();
  // useAddProductMutation
  const [editProduct, { data: editProductData, isError: editErr, isLoading: editLoading }] =
    useEditProductMutation();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
    reset,
  } = useForm();
  // resetForm

  // handle submit product
  const handleSubmitProduct = async (data: any) => {
    // product data
    const productData: IAddProduct = {
      sku: data.sku,
      title: data.title,
      parent: parent,
      children: children,
      tags: tags,
      image: img,
      originalPrice: Number(data.price),
      price: Number(((data.price * (100 - data.discount) / 100)).toFixed(0)),
      discount: Number(data.discount),
      relatedImages: relatedImages,
      description: data.description,
      brand: brand,
      category: category,
      unit: data.unit,
      quantity: Number(data.quantity),
      colors: colors,
    };
    console.log('productData-------------------..>', productData)
    if (!img) {
      return notifyError("Phải có hình minh họa sản phẩm!");
    }
    if (!category.name) {
      return notifyError("Phải có danh mục cho sản phẩm!");
    }
    if (Number(data.discount) > 100) {
      return notifyError("Giảm giá không hơn 100%");
    } else {
      const res = await addProduct(productData);

      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string, errorMessages?: { path: string, message: string }[] };
          if (errorData.errorMessages && Array.isArray(errorData.errorMessages)) {
            const errorMessage = errorData.errorMessages.map(err => err.message).join(", ");
            return notifyError(errorMessage);
          }
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      }
      else {
        notifySuccess("Thêm sản phẩm thành công");
        setIsSubmitted(true);
        router.push('/product-grid')
      }
    }
  };
  // handle edit product
  const handleEditProduct = async (data: any, id: string) => {
    
    // product data
    const productData: IAddProduct = {
      sku: data.sku,
      title: data.title,
      parent: parent,
      children: children,
      tags: tags,
      image: img,
      originalPrice: Number(data.price),
      price: Number(((data.price * (100 - data.discount) / 100)).toFixed(0)),
      discount: Number(data.discount),
      relatedImages: relatedImages,
      description: data.description,
      brand: brand,
      category: category,
      unit: data.unit,
      quantity: Number(data.quantity),
      colors: colors,
    };
    if (Number(data.discount) > 100) {
      return notifyError("Giảm giá không hơn 100%");
    } 

    const res = await editProduct({ id: id, data: productData })
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string, errorMessages?: { path: string, message: string }[] };
        if (errorData.errorMessages && Array.isArray(errorData.errorMessages)) {
          const errorMessage = errorData.errorMessages.map(err => err.message).join(", ");
          return notifyError(errorMessage);
        }
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    }
    else {
      notifySuccess("Cập nhật sản phẩm thành công");
      setIsSubmitted(true);
      router.push('/product-grid')
    }
  };

  return {
    img,
    setImg,
    parent,
    brand,
    setBrand,
    category,
    setCategory,
    handleSubmitProduct,
    handleEditProduct,
    register,
    handleSubmit,
    errors,
    control,
    setParent,
    setChildren,
    setTags,
    setColors,
    setRelatedImages,
    tags,
    isSubmitted,
    relatedImages,
    colors,
  };
};

export default useProductSubmit;
