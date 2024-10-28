"use client";
import { Member } from "@/types/member";
import get_data from "actions/get_data";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MembersTable() {
  const searchParams = useSearchParams();
  const group = searchParams.get("group");
  const [data, setData] = useState<Member[]>([]);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const resp = await get_data(
        token,
        `/members?group=${group == "0" ? "" : group}`
      );
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
          <th className="border px-2 py-1 font-medium text-black">Jabatan</th>
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
                <p className="text-black">{item.position}</p>
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
