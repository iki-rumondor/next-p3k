"use client";
import { Activity } from "@/types/activity";
import get_data from "actions/get_data";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const groups = ["POKJA I", "POKJA II", "POKJA III", "POKJA IV"];

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
          <th className="border px-2 py-1 font-medium text-black">Lokasi</th>
          <th className="border px-2 py-1 font-medium text-black">
            Kelompok Kerja
          </th>
          <th className="border px-2 py-1 font-medium text-black">
            Tanggal Kegiatan
          </th>
          <th className="border px-2 py-1 font-medium text-black">
            Anggota Hadir
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
                <p className="text-black">{item.location}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">{groups[item.group - 1]}</p>
              </td>
              <td className="border px-2 py-1">
                <p className="text-black">
                  {moment.unix(item.date / 1000).format("DD-MM-YYYY")}
                </p>
              </td>
              <td className="border px-2 py-1">
                {item.members ? (
                  item.members.map((i, idx) => (
                    <p className="text-black">
                      {idx + 1}. {i.name}
                    </p>
                  ))
                ) : (
                  <div>-</div>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
