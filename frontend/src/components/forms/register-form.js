import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
// internal
import { Email, EyeCut, Lock, UserTwo } from "@svg/index";
import ErrorMessage from "@components/error-message/error";
import { useRegisterUserMutation } from "src/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@utils/toast";


const schema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên").label("Name"),
  email: Yup.string().required("Vui lòng nhập địa chỉ email.").email("Email không hợp lệ.").label("Email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(6,"Mật khẩu phải có ít nhất 6 kí tự.").label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
});


const RegisterForm = () => {

  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [registerUser, { }] = useRegisterUserMutation();
  // react hook form
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  // on submit
  const onSubmit = (data) => {
    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }).then((data) => {
      if (data?.error) {
        notifyError('Đăng ký thất bại');
      }
      else {
        notifySuccess(data?.data?.message);
      }
    })
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login__input-wrapper">
        <div className="login__input-item">
          <div className="login__input">
            <input
              {...register("name", { required: `Trường này là bắt buộc!` })}
              name="name"
              type="text"
              placeholder="Nhập tên của bạn"
              id="name"
            />
            <span>
              <UserTwo />
            </span>
          </div>
          <ErrorMessage message={errors.name?.message} />
        </div>

        <div className="login__input-item">
          <div className="login__input">
            <input
              {...register("email", { required: `Email là bắt buộc!` })}
              name="email"
              type="email"
              placeholder="Nhập địa chỉ email"
              id="email"
            />
            <span>
              <Email />
            </span>
          </div>
          <ErrorMessage message={errors.email?.message} />
        </div>

        <div className="login__input-item">
          <div className="login__input-item-inner p-relative">
            <div className="login__input">
              <input
                {...register("password", { required: `Mật khẩu là bắt buộc` })}
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Mật khẩu"
                id="password"
              />
              <span>
                <Lock />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <i className="fa-regular fa-eye"></i> : <EyeCut />}
            </span>
          </div>
          <ErrorMessage message={errors.password?.message} />
        </div>

        <div className="login__input-item">
          <div className="login__input-item-inner p-relative">
            <div className="login__input">
              <input
                {...register("confirmPassword")}
                name="confirmPassword"
                type={showConPass ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                id="confirmPassword"
              />
              <span>
                <Lock />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowConPass(!showConPass)}
            >
              {showConPass ? <i className="fa-regular fa-eye"></i> : <EyeCut />}
            </span>
          </div>
          <ErrorMessage message={errors.confirmPassword?.message} />
        </div>
      </div>


      <div className="login__btn mt-25">
        <button type="submit" className="tp-btn w-100">
          Đăng ký
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
