import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import ReactToPrint from "react-to-print";
// internal
import SEO from "@components/seo";
import Loader from "@components/loader/loader";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import { useGetUserOrderByIdQuery } from "src/redux/features/orderApi";
import ErrorMessage from "@components/error-message/error";
import formatPrice from "@utils/formatPrice";


const SingleOrder = ({ params }) => {
  const orderId = params.id;
  const printRef = useRef();
  const { data: order, isError, isLoading } = useGetUserOrderByIdQuery(orderId);
  let content = null;
  if (isLoading) {
    content = (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }
  if (isError) {
    content = <ErrorMessage message="Đã có lỗi xảy ra. Vui lòng tải lại!" />;
  }
  if (!isLoading && !isError) {
    const {
      name,
      country,
      city,
      contact,
      invoice,
      createdAt,
      cart,
      cardInfo,
      shippingCost,
      discount,
      totalAmount,
    } = order.order;
    content = (
      <section className="invoice__area pt-120 pb-120">
        <div className="container">
          {/* <!-- invoice msg --> */}
          <div className="invoice__msg-wrapper">
            <div className="row">
              <div className="col-xl-12">
                <div className="invoice_msg mb-40">
                  <p className="text-black alert alert-success">
                   Cảm ơn <strong>{name}</strong> Đơn hàng của bạn đã được ghi nhận !
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div
            ref={printRef}
            className="invoice__wrapper grey-bg-15 pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper"
          >
            {/* <!-- invoice header --> */}
            <div className="invoice__header-wrapper border-2 border-bottom border-white mb-40">
              <div className="row">
                <div className="col-xl-12">
                  <div className="invoice__header pb-20">
                    <div className="row align-items-end">
                      <div className="col-md-4 col-sm-6">
                        <div className="invoice__left">
                          <h3>UETShop</h3>
                          <p>
                            Mỹ Đình <br /> Nam Từ Liêm, Hà Nội
                          </p>
                        </div>
                      </div>
                      <div className="col-md-8 col-sm-6">
                        <div className="invoice__right mt-15 mt-sm-0 text-sm-end">
                          <h3 className="text-uppercase font-70 mb-20">
                            Hóa đơn
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- invoice customer details --> */}
            <div className="invoice__customer mb-30">
              <div className="row">
                <div className="col-md-6 col-sm-8">
                  <div className="invoice__customer-details">
                    <h4 className="mb-10 text-uppercase">{name}</h4>
                    <p className="mb-0 text-uppercase">{country}</p>
                    <p className="mb-0 text-uppercase">{city}</p>
                    <p className="mb-0">{contact}</p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-4">
                  <div className="invoice__details mt-md-0 mt-20 text-md-end">
                    <p className="mb-0">
                      <strong>Mã hóa đơn:</strong> #{invoice}
                    </p>
                    <p className="mb-0">
                      <strong>Ngày:</strong>{" "}
                      {dayjs(createdAt).locale("vi").format("DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- invoice order table --> */}
            <div className="invoice__order-table pt-30 pb-30 pl-40 pr-40 bg-white  mb-30">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Tổng</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {cart.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.orderQuantity}</td>
                      <td>{formatPrice(item.price)}</td>
                      <td>{formatPrice(item.price * item.orderQuantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <!-- invoice total --> */}
            <div className="invoice__total pt-40 pb-10 alert-success pl-40 pr-40 mb-30">
              <div className="row">
                <div className="col-lg-3 col-md-4">
                  <div className="invoice__payment-method mb-30">
                    <h5 className="mb-0">Phương thức thanh toán</h5>
                    <p className="tp-font-medium text-uppercase">
                      {cardInfo.type}
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="invoice__shippint-cost mb-30">
                    <h5 className="mb-0">Phí vận chuyển</h5>
                    <p className="tp-font-medium">{formatPrice(shippingCost)}</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="invoice__discount-cost mb-30">
                    <h5 className="mb-0">Ưu đãi</h5>
                    <p className="tp-font-medium">{formatPrice(discount)}</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="invoice__total-ammount mb-30">
                    <h5 className="mb-0">Tổng cộng</h5>
                    <p className="tp-font-medium text-danger">
                      <strong>{formatPrice(totalAmount)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- invoice print --> */}
            <div className="invoice__print text-end">
              <div className="row">
                <div className="col-xl-12">
                  <ReactToPrint
                    trigger={() => (
                      <button
                        type="button"
                        className="tp-invoice-print tp-btn tp-btn-black"
                      >
                        <span className="mr-5">
                          <i className="fa-regular fa-print"></i>
                        </span>{" "}
                        In
                      </button>
                    )}
                    content={() => printRef.current}
                    documentTitle="Invoice"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <Wrapper>
        <SEO pageTitle={"Order Details"} />
        <Header style_2={true} />
        {/* content */}
        {content}
        {/* content */}
        {/* footer start */}
        <Footer />
        {/* footer end */}
      </Wrapper>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  return {
    props: { params },
  };
};

export default SingleOrder;
