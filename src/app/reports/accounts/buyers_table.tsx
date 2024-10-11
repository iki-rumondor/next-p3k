import { Guest } from "@/types/guest";
import moment from "moment";
import React from "react";

interface TableProps {
  data: Guest[];
}

const BuyersTable: React.FC<TableProps> = ({ data }) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-left">
          <th className="border px-2 py-1 font-medium text-black">
            Nama Lengkap
          </th>
          <th className="border px-2 py-1 font-medium text-black">Alamat</th>
          <th className="border px-2 py-1 font-medium text-black">
            Nomor Handphone
          </th>
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
              <p className="text-black">{item.address}</p>
            </td>
            <td className="border px-2 py-1">
              <p className="text-black">{item.phone_number}</p>
            </td>
            <td className="border px-2 py-1">
              <p className="text-black">{item.user.username}</p>
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
};

export default BuyersTable;
