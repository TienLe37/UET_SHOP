import React from "react";
import { Order } from "@/types/order-amount-type";
import dayjs from "dayjs";
import { format } from "path";
import formatPrice from "@/utils/formatPrice";

// prop type
type IPropType = {
  orderData: Order;
};

const InvoicePrint = ({ orderData }: IPropType) => {
  
  return (
    <>
      {/* top bar start */}
      <div className="flex items-center justify-center flex-wrap px-8 mb-6 bg-white border-b border-slate-200 py-6 text-center">
        <div className="relative">
          <h3 className="font-normal mb-0">UETSHOP</h3>
          <p className="mb-0 text-tiny">Hà Nội, Việt Nam</p>
          <p className="mb-0 text-tiny">0123456789</p>
        </div>
      </div>
      {/* top bar end */}

      {/* details table */}
      <div className="grid grid-cols-12 gap-6 px-6">
        <div className="col-span-12">
          <div className="bg-white border border-slate-200 py-8 mb-4">
            <div className="relative overflow-x-auto  mx-8">
              <table className="w-[500px] md:w-full text-base text-left text-gray-500">
                <thead className="bg-white">
                  <tr className="border-b border-gray6 text-tiny">
                    <th
                      scope="col"
                      className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                    >
                      Sản phẩm
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                    >
                      Giá
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                    >
                      Số lượng
                    </th>
                    
                    <th
                      scope="col"
                      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                    >
                      Tổng cộng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.cart.map((p) => (
                    <tr
                      key={p._id}
                      className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                    >
                      <td className="pr-8 py-5 whitespace-nowrap">
                        <a href="#" className="flex items-center space-x-5">
                          <span className="font-medium text-heading text-hover-primary transition">
                            {p.title}
                          </span>
                        </a>
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {formatPrice(p.price)}
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {p.orderQuantity}
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {formatPrice(p.orderQuantity * p.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 py-4 px-4">
            <h5 className="text-center mb-0">Giá trị đơn hàng</h5>
            <div className="relative overflow-x-auto mx-4">
              <table className="w-full text-base text-left text-gray-500">
                <tbody>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 pt-6 font-normal text-[#55585B] text-start">
                      Tổng phụ:
                    </td>
                    <td className="px-3 py-3 pt-6 font-normal text-[#55585B] text-end">
                      {formatPrice(orderData.subTotal)}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Phí vận chuyển:
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {formatPrice(orderData.shippingCost)}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Tổng thanh toán:
                    </td>
                    <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                      {formatPrice(orderData.totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* details table */}
      
      {/* details table */}
      <div className="grid grid-cols-12 gap-6 px-6 py-6">
        <div className="col-span-12">
          <div className="bg-white border border-slate-200 px-4">
            <div className="relative overflow-x-auto mx-4">
              <table className="w-full text-base text-left text-gray-500">
                <tbody>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 pt-6 font-normal text-[#55585B] text-start">
                      Phương thức thanh toán:
                    </td>
                    <td className="px-3 py-3 pt-6 font-normal text-[#55585B] text-end">
                      {orderData.paymentMethod}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Mã hoá đơn:
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      #{orderData.invoice}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Số lượng sản phẩm:
                    </td>
                    <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                      {orderData.cart.length}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Ngày đặt:
                    </td>
                    <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                      {dayjs(orderData.createdAt).format('DD/MM/YYYY')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* details table */}

      <div className="flex items-center justify-center flex-wrap px-8 mb-6 bg-white rounded-t-md rounded-b-md  py-6 text-center">
          <h3 className="font-normal mb-0">Cảm ơn vì đã đặt hàng. Mong quý khách quay lại!  </h3>
      </div>
    </>
  );
};

export default InvoicePrint;
