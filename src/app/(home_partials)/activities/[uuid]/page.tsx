"use client";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import Loader from "@/components/Loader";
import get_data from "actions/get_data";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const groups = ["POKJA I", "POKJA II", "POKJA III", "POKJA IV"];

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../activities",
    back_push: "/activities",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const resp = await get_data(token, `/activities/${params.uuid}`);
      setValues(resp.data);
      setIsCheck(true);
    } catch (error: any) {
      toast.error(error.message);
      router.push(config.back_push);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return !isCheck ? (
    <Loader />
  ) : (
    <section className="p-10">
      <div className="inline-flex gap-2.5">
        <Link
          href={config.back_url}
          className="inline-flex items-center justify-center gap-2.5 bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 mb-4"
        >
          <span>
            <BackArrowIcon />
          </span>
          Kembali
        </Link>
      </div>
      <div className="relative h-100 overflow-hidden mb-5 bg-white">
        <img
          className="w-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"
          src={`${baseAPIUrl}/files/activities/${values?.image_name}`}
          alt={`${values?.title}`}
        />
      </div>
      <div className="w-full grid lg:grid-cols-3 lg:gap-8">
        <div className="col-span-2">
          <div className="p-5 shadow-md bg-white">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium text-title-xl">{values?.title}</div>
              <div className="px-3 py-1 bg-primary text-white">
                {groups[values?.group - 1]}
              </div>
            </div>
            <div className="mb-7">
              <div>Lokasi: {values?.location}</div>
              <div>{values?.description}</div>
            </div>
            <small>
              Tanggal Kegiatan : {moment.unix(values?.date / 1000).format("DD/MM/YYYY")}
            </small>
          </div>
        </div>
        <div className="col-span-1">
          <div className="p-5 bg-white shadow-md">
            <div className="font-medium text-lg mb-5">Daftar Anggota Hadir</div>
            {values.members.length > 0 &&
              values.members.map((item: any) => (
                <div className="mb-2 pb-1 text-sm border-b border-stroke">
                  <div className="flex justify-between items-center gap-2">
                    <div className="col-span-4">{item.name}</div>
                    <Link
                      target="_blank"
                      className="text-end text-primary font-medium"
                      href={`${baseAPIUrl}/files/attendances/${item.attendance_image}`}
                    >
                      Lihat
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
