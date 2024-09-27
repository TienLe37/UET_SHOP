"use client";
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAdminConfirmForgotPasswordMutation } from "@/redux/auth/authApi";
import ErrorMsg from "@/app/components/common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";

// schema
const schema = Yup.object().shape({
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(6,"Mật khẩu phải có ít nhất 6 kí tự").label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Mật khẩu nhập lại không khớp!"
  ),
});

const ForgetPasswordPage = ({ params }: { params: { token: string } }) => {
  const token = params.token;
  const router = useRouter();
  const [adminConfirmForgotPassword, {}] =
    useAdminConfirmForgotPasswordMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = async (data: { password: string }) => {
    const res = await adminConfirmForgotPassword({
      password: data.password,
      token,
    });
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
          notifySuccess(res?.data?.message);
          router.push("/login");
          reset();
      }
    }
  
  return (
    <div className="tp-main-wrapper h-screen">
      <div className="container mx-auto my-auto h-full flex items-center justify-center">
        <div className="pt-[120px] pb-[120px]">
          <div className="grid grid-cols-12 shadow-lg bg-white overflow-hidden rounded-md ">
            <div className="col-span-12 lg:col-span-12 md:w-[500px] mx-auto my-auto  pt-[50px] py-[60px] px-5 md:px-[60px]">
              <div className="text-center">
                <h4 className="text-[24px] mb-1">Đặt lại mật khẩu</h4>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <p className="mb-0 text-base text-black">
                    Mật khẩu mới <span className="text-red">*</span>
                  </p>
                  <input
                    {...register("password", {
                      required: `Password is required!`,
                    })}
                    name="password"
                    className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                  />
                  <ErrorMsg msg={errors.password?.message as string} />
                </div>
                <div className="mb-5">
                  <p className="mb-0 text-base text-black">
                  Nhập lại mật khẩu <span className="text-red">*</span>
                  </p>
                  <input
                    {...register("confirmPassword")}
                    name="confirmPassword"
                    className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                  />
                  <ErrorMsg msg={errors.confirmPassword?.message as string} />
                </div>
                <button className="tp-btn h-[49px] w-full justify-center">
                  Đặt lại mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
