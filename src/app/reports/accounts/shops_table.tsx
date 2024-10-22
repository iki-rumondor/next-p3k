import EyeIcon from "@/components/Icons/EyeIcon";
import { Umkm } from "@/types/umkm";
import moment from "moment";
import React from "react";

interface TableProps {
  data: Umkm[];
}

const ShopsTable: React.FC<TableProps> = ({ data }) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-left">
          <th className="border px-2 py-1 font-medium text-black">
            Nama Lengkap
          </th>
          <th className="border px-2 py-1 font-medium text-black">Nama Toko</th>
          <th className="border px-2 py-1 font-medium text-black">Username</th>
          <th className="border px-2 py-1 font-medium text-black">
            Tanggal Mendaftar
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, key) => (
          <tr key={key}>
            <td className="border px-2 py-1">
              <p className="text-black">{item.name}</p>
            </td>
            <td className="border px-2 py-1">
              <p className="text-black">{item.owner}</p>
            </td>
            <td className="border px-2 py-1">
              <p className="text-black">{item.user.username}</p>
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
};

export default ShopsTable;
