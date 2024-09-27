import React from "react";
import Link from "next/link";
// internal
import Shapes from "@components/login-register/shapes";
import ForgotForm from "@components/forms/forgot-form";

const ForgotArea = () => {
  return (
    <section className="login__area pt-110 pb-110">
      <div className="container">
        <div className="login__inner p-relative z-index-1">
          <Shapes />
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="login__wrapper">
                <div className="login__top mb-30 text-center">
                  <h3 className="login__title">Quên mật khẩu?</h3>
                  <p>Nhập địa chỉ email để gửi yêu cầu đặt lại mật khẩu.</p>
                </div>
                <div className="login__form">
                  {/* forgot form start */}
                  <ForgotForm/>
                  {/* forgot form end */}
                  <div className="login__register-now">
                    <p>
                      Vẫn nhớ mật khẩu? <Link href="/login">Đăng nhập</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotArea;
