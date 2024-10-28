"use client";
import { Citizen } from "@/types/citizen";
import get_data from "actions/get_data";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CitizensTable() {
  const [data, setData] = useState<Citizen[]>([]);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const resp = await get_data(token, `/citizens`);
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
          <th className="border px-2 py-1 font-medium text-black">Nama</th>
          <th className="border px-2 py-1 font-medium text-black">NIK</th>
          <th className="border px-2 py-1 font-medium text-black">Alamat</th>
          <th className="border px-2 py-1 font-medium text-black">
            Nomor Telepon
          </th>
          <th className="border px-2 py-1 font-medium text-black">
            Ditambahkan Pada
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, key) => (
            <tr key={key}>
              <td className="border px-2 py-1">
                <p className="text-black">{item.name}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{item.nik}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{item.address}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{item.phone_number}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">
                  {moment.unix(item.created_at / 1000).format("D-M-yyyy")}
                </p>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
