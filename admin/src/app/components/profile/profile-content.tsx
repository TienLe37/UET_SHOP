"use client";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import ProfileChangePass from "./profile-change-pass";
import { notifyError, notifySuccess } from "@/utils/toast";

// prop type
type IPropType = {
  profileImg: string;
  updateProfile: any;
};

const ProfileContent = ({ profileImg, updateProfile }: IPropType) => {
  const { user } = useSelector((state: RootState) => state.auth);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // onSubmit
  const onSubmit = async (formData: {
    email?: string;
    name?: string;
    phone?: string;
  }) => {
    if (user?._id && formData) {
      const res = await updateProfile({
        id: user._id,
        data: {
          email: formData.email,
          image: profileImg,
          name: formData.name,
          phone: formData.phone,
          joiningData: dayjs(new Date()).format("YYYY-MM-DD"),
        },
      });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Cập nhật hồ sơ thành công!");
        reset();
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-8">
          <div className="py-10 px-10 bg-white rounded-md">
            <h5 className="text-xl mb-6">Thông tin cơ bản</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
                <div className="mb-5">
                  <p className="mb-0 text-base text-black">Tên</p>
                  <input
                    {...register("name", { required: false })}
                    name="name"
                    className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
                    type="text"
                    placeholder="Name"
                    defaultValue={user?.name}
                  />
                </div>
              </div>
              <div className="mb-5">
                <p className="mb-0 text-base text-black">Email</p>
                <input
                  {...register("email", { required: false })}
                  name="email"
                  className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
                <div className="mb-5">
                  <p className="mb-0 text-base text-black">Số điện thoại</p>
                  <input
                    {...register("phone", { required: false })}
                    name="phone"
                    className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
                    type="text"
                    placeholder="Phone"
                    defaultValue={user?.phone}
                  />
                </div>
              </div>
              <div className="text-end mt-5">
                <button className="tp-btn px-10 py-2">Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-12 2xl:col-span-4">
          <div className="py-10 px-10 bg-white rounded-md">
            <h5 className="text-xl mb-6">Đổi mật khẩu</h5>
            {/* change password start */}
            <ProfileChangePass />
            {/* change password end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
