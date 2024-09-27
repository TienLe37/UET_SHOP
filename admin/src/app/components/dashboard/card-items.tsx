"use client";
import React, { useEffect, useState } from "react";
import { MonthSales, Received, Sales, TotalOrders } from "@/svg";
import { useGetDashboardAmountQuery } from "@/redux/order/orderApi";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isBetween from "dayjs/plugin/isBetween";
import ErrorMsg from "../common/error-msg";
import formatPrice from "@/utils/formatPrice";
dayjs.extend(isToday, isYesterday);
dayjs.extend(isBetween);

type IPropType = {
  title: string;
  amount: string;
  cash?: number;
  card?: number;
  icon: React.ReactNode;
  clr: string;
  clr2: string;
};

function CardItem({ title, amount, icon, clr2 }: IPropType) {
  return (
    <div className="widget-item bg-white p-6 flex justify-between rounded-md">
      <div>
        <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
          {amount}
        </h4>
        <p className="text-tiny leading-4">{title}</p>
      </div>
      <div>
        <span
          className={`text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 ${clr2}`}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}

const CardItems = () => {
  const {
    data: dashboardOrderAmount,
    isError,
    isLoading,
  } = useGetDashboardAmountQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="Đã có lỗi xảy ra. Vui lòng tải lại!" />;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <CardItem
          title="Doanh thu hôm qua"
          amount={formatPrice(dashboardOrderAmount?.yesterdayOrderAmount)}
          icon={<Sales />}
          clr="text-purple bg-purple/10"
          clr2="bg-purple"
        />
        <CardItem
          title="Doanh thu hôm nay"
          amount={formatPrice(dashboardOrderAmount?.todayOrderAmount)}
          icon={<Received />}
          clr=""
          clr2="bg-success"
        />
        <CardItem
          title="Doanh thu tháng này"
          amount={formatPrice(dashboardOrderAmount?.monthlyOrderAmount)}
          icon={<MonthSales />}
          clr="text-info bg-info/10"
          clr2="bg-info"
        />
        <CardItem
          title="Tổng doanh thu"
          amount={formatPrice(dashboardOrderAmount?.totalOrderAmount)}
          icon={<TotalOrders />}
          clr="text-warning bg-warning/10"
          clr2="bg-warning"
        />
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {content}
    </div>
  );
};

export default CardItems;
