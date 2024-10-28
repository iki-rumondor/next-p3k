"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Select from "@/components/Forms/Select";
import Textarea from "@/components/Forms/Textarea";
import Upload from "@/components/Forms/Upload";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import post_data from "actions/post_data";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const defaultValue = {
  title: "",
  description: "",
  group: "",
  location: "",
  date: "",
};

const groups = [
  { value: 1, name: "POKJA I (PENGHAYATAN DAN PENGALAMAN PANCASILA)" },
  { value: 2, name: "POKJA II (PENDIDIKAN DAN KETERAMPILAN)" },
  { value: 3, name: "POKJA III (PANGAN, SANDANG, DAN PERUMAHAN)" },
  {
    value: 4,
    name: "POKJA IV (KESEHATAN, KELESTARIAN LINGKUNGAN HIDUP, DAN PERENCANAAN SEHAT",
  },
];

const convertToMB = (bytes: number) => {
  const size = (bytes / (1024 * 1024)).toFixed(2);
  return `${size} MB`;
};

export default function page() {
  const config = {
    back_url: "../activities",
    back_push: "/admin/activities",
    submit_api: "/activities",
    title_form: "Tambah Data Kegiatan",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any | null>(null);
  const [values, setValues] = useState(defaultValue);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e: any) => {
    e.target.files && setFile(e.target.files[0]);
  };

  const groupProps = {
    value: values.group,
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
    handleChange: handleChange,
    label: "Judul Kegiatan",
    placeholder: "Masukkan Judul Kegiatan",
    name: "title",
    type: "text",
    value: values.title,
  };

  const locationProps = {
    handleChange: handleChange,
    label: "Lokasi Kegiatan",
    placeholder: "Masukkan Lokasi Kegiatan",
    name: "location",
    type: "text",
    value: values.location,
  };

  const dateProps = {
    handleChange: handleChange,
    label: "Tanggal Kegiatan",
    placeholder: "Masukkan Tanggal Kegiatan",
    name: "date",
    type: "date",
    value: values.date,
  };

  const descriptionProps = {
    handleChange: handleChange,
    label: "Deskripsi Kegiatan",
    placeholder: "Masukkan Deskripsi Kegiatan",
    name: "description",
    value: values.description,
    rows: 7,
  };

  const uploadProps = {
    primary: "File Harus Dalam Format Gambar",
    secondary: "(Ukuran Max: 1MB)",
    handleChange: handleChangeFile,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    if (file == null) {
      toast.error("File belum diupload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", values.title);
    formData.append("group", values.group);
    formData.append("description", values.description);
    formData.append("location", values.location);

    const unixTimeMillis = moment(values.date, "YYYY-MM-DD").valueOf();
    formData.append("date", unixTimeMillis.toString());

    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        config.submit_api,
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

  return (
    <>
      <Link
        href={config.back_url}
        className="inline-flex items-center justify-center gap-2.5 bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 mb-4"
      >
        <span>
          <BackArrowIcon />
        </span>
        Kembali
      </Link>
      <LayoutForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        title={config.title_form}
      >
        <Select props={groupProps} />
        <Input props={titleProps} />
        <Textarea props={descriptionProps} />
        <Input props={locationProps} />
        <Input props={dateProps} />
        {file ? (
          <div className="mb-4.5">
            <p>Nama File : {file.name}</p>
            <p>Ukuran : {convertToMB(file.size)}</p>
            <button
              onClick={() => setFile(null)}
              className="inline-flex items-center justify-center gap-1.5 font-small bg-rose-500 text-white px-2 py-1 rounded-md mt-2 hover:bg-rose-600"
            >
              <span>
                <DeleteIcon />
              </span>
              Hapus
            </button>
          </div>
        ) : (
          <>
            <div className="mb-3 block text-sm font-medium text-black dark:text-white">
              Pilih Gambar Kegiatan
            </div>
            <Upload props={uploadProps} />
          </>
        )}
      </LayoutForm>
    </>
  );
}
