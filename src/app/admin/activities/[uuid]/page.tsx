"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Textarea from "@/components/Forms/Textarea";
import Upload from "@/components/Forms/Upload";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import Loader from "@/components/Loader";
import DeleteModal from "@/components/Modal/DeleteModal";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const convertToMB = (bytes: number) => {
  const size = (bytes / (1024 * 1024)).toFixed(2);
  return `${size} MB`;
};

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../activities",
    back_push: "/admin/activities",
    default_api: `/activities/${params.uuid}`,
    title_form: "Update Data Kegiatan",
    delete_title: "Apakah anda yakin akan menghapus data kegiatan tersebut?",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<any>({});
  const [file, setFile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e: any) => {
    e.target.files && setFile(e.target.files[0]);
  };

  const titleProps = {
    handleChange: handleChange,
    label: "Judul Kegiatan",
    placeholder: "Masukkan Judul Kegiatan",
    name: "title",
    type: "text",
    value: values.title,
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

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);

      const resp = await get_data(token, config.default_api);
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
    formData.append("title", values.title);
    formData.append("description", values.description);
    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        config.default_api,
        "PUT",
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

  const handleDelete = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await post_data(token, config.default_api, "DELETE");
      toast.success(response.message);
      router.push(config.back_push);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProps = {
    title: config.delete_title,
    toggleModal: () => setOpen(!open),
    handleSubmit: handleDelete,
    isLoading: isLoading,
  };

  useEffect(() => {
    handleLoad();
  }, []);

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
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2.5 bg-rose-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 mb-4"
        >
          <span>
            <DeleteIcon />
          </span>
          Hapus
        </button>
      </div>
      <LayoutForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        title={config.title_form}
      >
        <Input props={titleProps} />
        <Textarea props={descriptionProps} />
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
        <div className="mt-5 pt-3 border-t border-stroke text-sm">
          <div>
            Diubah Oleh : <span>{values?.updated_user?.name}</span>
          </div>
          <div>
            Diubah Pada :{" "}
            <span>{moment.unix(values.updated_at / 1000).fromNow()}</span>
          </div>
        </div>
      </LayoutForm>

      {open && <DeleteModal props={deleteProps} />}
    </>
  );
}
