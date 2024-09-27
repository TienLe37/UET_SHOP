import React from "react";

function ThItem({ title,cls }: { title: string,cls?:string }): React.JSX.Element {
  return (
    <th
      scope="col"
      className={`px-3 py-3 text-tiny text-text2 uppercase font-semibold ${cls}`}
    >
      {title}
    </th>
  );
}

const TableHead = () => {
  return (
    <thead className="bg-white">
      <tr className="border-b border-gray6 text-tiny">
        <ThItem title="Mã hóa đơn" />
        <ThItem title="Thời gian đặt hàng" />
        <ThItem title="Tên khách hàng" />
        <ThItem title="Giá" />
        <ThItem title="Trạng thái" />
        <ThItem title="Action" />
        <ThItem title="Hóa đơn" cls="text-end" />
      </tr>
    </thead>
  );
};

export default TableHead;
