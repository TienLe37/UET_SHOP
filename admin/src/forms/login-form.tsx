"use client"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation';
import { notifyError, notifySuccess } from "@/utils/toast";
import { useLoginAdminMutation } from "@/redux/auth/authApi";
import ErrorMsg from "@/app/components/common/error-msg";
import Link from "next/link";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required("Vui lòng nhập địa chỉ email").email("Địa chỉ email không hợp lệ").label("Email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu tối thiểu 6 kí tự").label("Password"),
});

const LoginForm = () => {
  const [loginAdmin, {data:loginData}] = useLoginAdminMutation();
  const router = useRouter();
  // react hook form
  const {register,handleSubmit,formState: { errors },reset} = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit =async (data: { email: string; password: string }) => {
    const res = await loginAdmin({ email: data.email, password: data.password });
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Đăng nhập thành công!");
      reset();
      router.push('/dashboard')
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Địa chỉ email <span className="text-red">*</span>
        </p>
        <input
          {...register("email")}
          name="email"
          id="email"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="email"
          placeholder="Nhập địa chỉ email"
        />
        <ErrorMsg msg={errors.email?.message as string} />
      </div>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Mật khẩu <span className="text-red">*</span>
        </p>
        <input
          {...register("password")}
          id="password"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="password"
          placeholder="Mật khẩu"
        />
        <ErrorMsg msg={errors.password?.message as string} />
      </div>
      <div className="flex items-center justify-between">
        <div className="tp-checkbox flex items-start space-x-2 mb-3">
          <input id="product-1" type="checkbox" />
          <label htmlFor="product-1" className="text-tiny">
            Ghi nhớ
          </label>
        </div>
        <div className="mb-4">
          <Link
            href="/forgot-password"
            className="text-tiny font-medium text-theme border-b border-transparent hover:border-theme"
          >
            Quên mật khẩu?
          </Link>
        </div>
      </div>
      <button type="submit" className="tp-btn h-[49px] w-full justify-center">
        Đăng nhập
      </button>
    </form>
  );
};

export default LoginForm;
