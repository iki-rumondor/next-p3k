"use client";
import { Activity } from "@/types/activity";
import get_data from "actions/get_data";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ActivityTable() {
  const searchParams = useSearchParams();
  const group = searchParams.get("group");
  const [data, setData] = useState<Activity[]>([]);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const resp = await get_data(
        token,
        `/activities?group=${group == "0" ? "" : group}`
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
          <th className="border px-2 py-1 font-medium text-black">Judul</th>
          <th className="border px-2 py-1 font-medium text-black">Deskripsi</th>
          <th className="border px-2 py-1 font-medium text-black">
            Kelompok Kerja
          </th>
          <th className="border px-2 py-1 font-medium text-black">
            Anggota Hadir
          </th>
          <th className="border px-2 py-1 font-medium text-black">
            Dibuat Oleh
          </th>
          <th className="border px-2 py-1 font-medium text-black">
            Dibuat pada
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, key) => (
            <tr key={key}>
              <td className="border px-2 py-1">
                <p className="text-black">{item.title}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{item.description}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{item.group}</p>
              </td>
              <td className="border px-2 py-1">
                {item.members ? (
                  item.members.map((i) => (
                    <p className="text-black">{i.name}</p>
                  ))
                ) : (
                  <div>-</div>
                )}
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{item.created_user.name}</p>
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
