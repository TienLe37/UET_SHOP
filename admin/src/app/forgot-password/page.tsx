import ForgotForm from "../components/forgot/forgot-form";


const ForgetPage = () => {
  return (
    <div className="tp-main-wrapper h-screen">
      <div className="container mx-auto my-auto h-full flex items-center justify-center">
        <div className="w-[500px] mx-auto my-auto shadow-lg bg-white pt-[50px] py-[60px] px-[60px]">
          <div className="text-center">
            <h4 className="text-[24px] mb-1">Đặt lại mật khẩu</h4>
            <p>Nhập địa chỉ email của bạn để đặt lại mật khẩu.</p>
          </div>
          <div className="">
            <ForgotForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPage;
