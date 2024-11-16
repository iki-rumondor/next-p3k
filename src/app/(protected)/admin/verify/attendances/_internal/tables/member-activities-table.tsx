"use client";

import { MemberActivity } from "@/types/member-activity";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export default function MemberActivitiesTable() {
  const config = {
    api_load: "/member-activities",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [data, setData] = useState<MemberActivity[] | null>(null);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await get_data(token, config.api_load);
      response.data && setData(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (id: string) => {
    const token = localStorage.getItem("token") || "";
    try {
      setReload(false);
      setIsLoading(true);
      const response = await post_data(
        token,
        `/member-activities/${id}/accept-attendance`,
        "PATCH"
      );
      toast.success(response.message);
      setReload(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [reload]);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="border-b border-stroke pb-4 dark:border-strokedark mb-4">
          <h3 className="font-medium text-black dark:text-white">
            Validasi Absensi Kegiatan PKK
          </h3>
        </div>
        {data && (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Kegiatan
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Nama Anggota
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Bukti Kehadiran
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Tanggal Ditambahkan
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.activity.title}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.member.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <a
                        target="_blank"
                        href={`${baseAPIUrl}/files/attendances/${item.attendance_image}`}
                        className="text-sm text-white bg-primary px-2 py-1"
                      >
                        Lihat
                      </a>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {moment.unix(item.created_at / 1000).format("DD-MM-y")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p
                        className={`${
                          item.is_accept ? "bg-success" : "bg-warning"
                        } text-white inline-block px-3 py-1 text-sm rounded-full`}
                      >
                        {item.is_accept ? "Disetujui" : "Belum Disetujui"}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        {item.is_accept ? (
                          <p>-</p>
                        ) : (
                          <button
                            disabled={isLoading}
                            onClick={() => handleSubmit(item.uuid)}
                            className="bg-primary text-white px-2 py-1 text-sm"
                          >
                            {isLoading ? "Loading..." : "Setuju"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
