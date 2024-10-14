"use client";
import { ProductTransaction } from "@/types/product_transaction";
import get_data from "actions/get_data";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TransactionsReportTable() {
  const [data, setData] = useState<ProductTransaction[]>([]);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const resp = await get_data(token, "/shops/transactions?is_accept=true");
      setData(resp.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-left">
          <th className="border px-2 py-1 font-medium text-black">Produk</th>
          <th className="border px-2 py-1 font-medium text-black">Pembeli</th>
          <th className="border px-2 py-1 font-medium text-black">
            Jumlah Dibeli
          </th>
          <th className="border px-2 py-1 font-medium text-black">
            Pendapatan
          </th>
          <th className="border px-2 py-1 font-medium text-black">
            Tanggal Pembelian
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, key) => (
            <tr key={key}>
              <td className="border px-2 py-1">
                <p className="text-black">{item.product.name}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{item.user.name}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{item.quantity}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{item.revenue}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">
                  {moment.unix(item.created_at / 1000).fromNow()}
                </p>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
