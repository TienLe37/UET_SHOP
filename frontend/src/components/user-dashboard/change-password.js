import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
// internal
import { useChangePasswordMutation } from "src/redux/features/auth/authApi";
import ErrorMessage from "@components/error-message/error";
import { notifyError, notifySuccess } from "@utils/toast";

const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  newPassword: Yup.string().required().min(6).label("New Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

const ChangePassword = () => {
  const { user } = useSelector((state) => state.auth);
  const [changePassword, { }] = useChangePasswordMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // on submit
  const onSubmit = (data) => {
    changePassword({
      email: user?.email,
      password: data.password,
      newPassword: data.newPassword,
    }).then((result) => {
      console.log(result)
      if (result?.error) {
        notifyError(result?.error?.data?.message)
      }
      else {
        notifySuccess(result?.data?.message)
      }
    });
    reset();
  };
  return (
    <div className="profile__password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xxl-12">
            <div className="profile__input-box">
              <h4>Địa chỉ Email</h4>
              <div className="profile__input">
                <input
                  {...register("email", { required: `Địa chỉ Email là bắt buôc!` })}
                  type="email"
                  defaultValue={user?.email}
                  placeholder="Nhập địa chỉ email"
                />
                <ErrorMessage message={errors.email?.message} />
              </div>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="profile__input-box">
              <h4>Mật khẩu hiện tại</h4>
              <div className="profile__input">
                <input
                  {...register("password", {
                    required: `Mật khẩu là bắt buộc!`,
                  })}
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <ErrorMessage message={errors.password?.message} />
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="profile__input-box">
              <h4>Mật khẩu mới</h4>
              <div className="profile__input">
                <input
                  {...register("newPassword", {
                    required: `Mật khẩu mới là bắt buộc!`,
                  })}
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                />
                <ErrorMessage message={errors.password?.newPassword} />
              </div>
            </div>
          </div>
          {/* confirm password */}
          <div className="col-xxl-6 col-md-6">
            <div className="profile__input-box">
              <h4>Nhập lại mật khẩu</h4>
              <div className="profile__input">
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                />
                <ErrorMessage message={errors.confirmPassword?.message} />
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="profile__btn">
              <button type="submit" className="tp-btn-3">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
