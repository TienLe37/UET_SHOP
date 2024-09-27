"use client";
import dayjs from "dayjs";
import React, { useRef } from "react";
import ErrorMsg from "../common/error-msg";
import { useGetSingleOrderQuery } from "@/redux/order/orderApi";
import { Invoice } from "@/svg";
import { useReactToPrint } from "react-to-print";
import { notifyError } from "@/utils/toast";
import InvoicePrint from "../orders/invoice-print";
import formatPrice from "@/utils/formatPrice";

const OrderDetailsArea = ({ id }: { id: string }) => {
  const { data: orderData, isLoading, isError } = useGetSingleOrderQuery(id);
  const printRef = useRef<HTMLDivElement | null>(null);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="Đã có lỗi xảy ra. Vui lòng tải lại!" />;
  }

  if (!isLoading && !isError && orderData) {

    content = (
      <>
        <div className="container grid px-6 mx-auto">
          <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
            Hóa đơn
          </h1>
          <div className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden">
            <div className=" mb-7">
              <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-slate-200">
                <h1 className="font-bold font-heading text-xl uppercase">
                  Hóa đơn
                  <p className="text-base mt-1 text-gray-500">
                    Trạng thái
                    <span className="pl-2 font-medium text-base capitalize">
                      {" "}
                      <span className="font-heading">
                        <span className="inline-flex px-2 text-base font-medium leading-5 rounded-full">
                          {orderData.status}
                        </span>
                      </span>
                    </span>
                  </p>
                </h1>
                <div className="lg:text-right text-left">
                  <h2 className="lg:flex lg:justify-end text-lg font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
                   
                  </h2>
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
                    Hà Nội, Việt Nam
                  </p>
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                  <span className="font-bold text-base uppercase block">
                    Ngày
                  </span>
                  <span className="text-base block">
                    <span>
                      {dayjs(orderData.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                  <span className="font-bold text-base uppercase block">
                    Mã hóa đơn
                  </span>
                  <span className="text-base block">#{orderData.invoice}</span>
                </div>
                <div className="flex flex-col lg:text-right text-left">
                  <span className="font-bold text-base uppercase block">
                    Khách hàng
                  </span>
                  <span className="text-base text-gray-500 block">
                    {orderData?.user?.name} <br />
                    <span className="ml-2">{orderData.contact}</span>
                    <br />
                    {orderData.address}
                    <br />
                    {orderData.city}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-12">
              <div className="relative rounded-b-md bg-white">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-base text-left text-gray-500 whitespace-no-wrap">
                    <thead className="bg-white">
                      <tr className="border-b border-gray6 text-tiny">
                        <td className="pl-3 py-3 text-tiny text-textBody uppercase font-semibold">STT</td>
                        <td className="pr-8 py-3 text-tiny text-textBody uppercase font-semibold">Tên sản phẩm Title</td>
                        <td className="pr-8 py-3 text-tiny text-textBody uppercase font-semibold text-center">Số lượng</td>
                        <td className="pr-3 py-3 text-tiny text-textBody uppercase font-semibold text-center">Giá</td>
                        <td className="pr-3 py-3 text-tiny text-textBody uppercase font-semibold text-right">Tổng</td>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y text-base ">
                      {orderData.cart.map((item, i) => (
                        <tr key={item._id} className="">
                          <td className="bg-white border-b border-gray6 px-3 py-3 text-start">
                            {i + 1}
                          </td>
                          <td className="bg-white border-b border-gray6 px-3 pl-0 py-3 text-start">
                            {item.title}
                          </td>
                          <td className="bg-white border-b border-gray6 px-3 py-3 font-bold text-center">
                            {item.orderQuantity}
                          </td>
                          <td className="bg-white border-b border-gray6 px-3 py-3 font-bold text-center">
                            {formatPrice(item.price)}
                          </td>
                          <td className="bg-white border-b border-gray6 px-3 py-3 text-right font-bold">
                            {formatPrice(item.price * item.orderQuantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl p-8 py-6">
              <div className="flex lg:flex-row md:flex-row flex-col justify-between">
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold text-base uppercase block">
                    Phương thức thanh toán
                  </span>
                  <span className="text-base font-semibold block">
                    {orderData.paymentMethod}
                  </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold text-base uppercase block">
                    Phí vận chuyển
                  </span>
                  <span className="text-base font-semibold font-heading block">
                    {formatPrice(orderData.shippingCost)}
                  </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold font-heading text-base uppercase block">
                    Giảm giá
                  </span>
                  <span className="text-base text-gray-500 font-semibold font-heading block">
                    {orderData?.discount}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold text-base uppercase block">
                    Tổng cộng
                  </span>
                  <span className="text-xl font-bold block">
                    {formatPrice(orderData.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handlePrint = useReactToPrint({
    content: () => printRef?.current,
    documentTitle: "Receipt",
  });

  const handlePrintReceipt = async () => {
    try {
      handlePrint();
    } catch (err) {
      console.log("order by user id error", err);
      notifyError("Đã có lỗi xảy ra");
    }
    // console.log('id', id);
  };

  return (
    <>
      {orderData && (
        <div ref={printRef}>
          <InvoicePrint orderData={orderData} />
        </div>
      )}
      <div className="container grid px-6 mx-auto">
        <div className="mb-4 mt-3 flex justify-between">
          <button onClick={handlePrintReceipt} className="tp-btn px-5 py-2">
            In hóa đơn
            <span className="ml-2">
              <Invoice />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsArea;
