"use client";
import BasicCard from "@/components/Card/BasicCard";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Select from "@/components/Forms/Select";
import Textarea from "@/components/Forms/Textarea";
import Upload from "@/components/Forms/Upload";
import UploadInput from "@/components/Forms/UploadInput";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import Loader from "@/components/Loader";
import DeleteModal from "@/components/Modal/DeleteModal";
import { Member } from "@/types/member";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserUuid } from "utils/jwt";

const groups = [
  { value: 1, name: "POKJA I (PENGHAYATAN DAN PENGALAMAN PANCASILA)" },
  { value: 2, name: "POKJA II (PENDIDIKAN DAN KETERAMPILAN)" },
  { value: 3, name: "POKJA III (PANGAN, SANDANG, DAN PERUMAHAN)" },
  {
    value: 4,
    name: "POKJA IV (KESEHATAN, KELESTARIAN LINGKUNGAN HIDUP, DAN PERENCANAAN SEHAT",
  },
];

interface TokenPayload {
  uuid: string;
  role: string;
  exp: number;
}

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../activities",
    back_push: "/members/activities",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<any>({});
  const [file, setFile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e: any) => {
    e.target.files && setFile(e.target.files[0]);
  };

  const groupProps = {
    disabled: true,
    value: values?.group,
    options: groups.map((item) => {
      return {
        name: item.name,
        value: item.value,
      };
    }),
    name: "group",
    label: "Pilih Kelompok Kerja",
    handleChange: handleChange,
  };

  const titleProps = {
    disable: true,
    handleChange: handleChange,
    label: "Judul Kegiatan",
    placeholder: "Masukkan Judul Kegiatan",
    name: "title",
    type: "text",
    value: values?.title,
  };

  const descriptionProps = {
    disabled: true,
    handleChange: handleChange,
    label: "Deskripsi Kegiatan",
    placeholder: "Masukkan Deskripsi Kegiatan",
    name: "description",
    value: values.description,
    rows: 7,
  };

  const uploadProps = {
    label: "Upload Bukti Kehadiran",
    handleChange: handleChangeFile,
  };

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    const uuid = getUserUuid(token);
    try {
      setIsLoading(true);
      const resp = await get_data(
        token,
        `/activities/${params.uuid}?member=${uuid}`
      );
      console.log(resp);

      setValues(resp.data);
    } catch (error: any) {
      toast.error(error.message);
      router.push(config.back_push);
    } finally {
      setIsCheck(true);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    const formData = new FormData();
    formData.append("file", file);
    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        `/activities/${params.uuid}/attendance`,
        "POST",
        formData,
        true
      );
      toast.success(response.message);
      router.push(config.back_push);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetFile = async (filename: string) => {
    if (!filename) {
      toast.error("Filename tidak ditemukan");
      return;
    }

    const accessToken = localStorage.getItem("token");
    const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: `${baseAPIUrl}/files/attendances/${filename}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(response.data);
      window.open(url, "_blank");
    } catch (error: any) {
      const message = error?.response?.data?.message
        ? error.response.data.message
        : error.message;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [isSuccess]);

  return !isCheck ? (
    <Loader />
  ) : (
    <>
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
      <div className="grid md:grid-cols-5 md:gap-4">
        <div className="col-span-3">
          <BasicCard title={"Detail Kegiatan"}>
            <div className="p-6.5">
              <Select props={groupProps} />
              <Input props={titleProps} />
              <Textarea props={descriptionProps} />
              <div className="mt-5 pt-3 border-t border-stroke text-sm">
                <div>
                  Diubah Oleh : <span>{values?.updated_user?.name}</span>
                </div>
                <div>
                  Diubah Pada :{" "}
                  <span>
                    {moment.unix(values?.updated_at / 1000).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          </BasicCard>
        </div>
        <div className="col-span-2">
          <BasicCard title="Upload Bukti Absensi">
            <div className="p-6.5">
              {!values?.member_activity?.attendance_image ? (
                <>
                  <div className="mb-5">
                    <UploadInput props={uploadProps} />
                    <div className="text-xs">
                      *Bukti kehadiran harus mencakup wajah dengan latar
                      kegiatan saat sedang berlangsung
                    </div>
                  </div>
                  <button
                    disabled={isLoading || !file}
                    onClick={handleSubmit}
                    className={`${
                      !file ? "bg-slate-300" : "bg-primary hover:bg-blue-800"
                    }  text-white w-full py-2`}
                  >
                    {isLoading ? "Loading..." : "Upload"}
                  </button>
                </>
              ) : (
                <>
                  <div className="flex justify-between mb-4">
                    <div>Status:</div>
                    <div className="text-black-2 font-medium">
                      {values?.member_activity?.is_accept
                        ? "Diterima"
                        : "Belum Diresponse"}
                    </div>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() =>
                      handleGetFile(values?.member_activity?.attendance_image)
                    }
                    className="bg-primary hover:bg-blue-800 text-white w-full py-2"
                  >
                    {isLoading ? "Loading..." : "Lihat"}
                  </button>
                </>
              )}
            </div>
          </BasicCard>
        </div>
      </div>
    </>
  );
}
