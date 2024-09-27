"use client"
import React from "react";
import OrderTable from "./order-table";

const OrderArea = () => {
  return (
    <>
      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        <OrderTable />
      </div>
    </>
  );
};

export default OrderArea;
