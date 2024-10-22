"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import Loader from "@/components/Loader";
import DeleteModal from "@/components/Modal/DeleteModal";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../citizens",
    back_push: "/admin/master/citizens",
    default_api: `/citizens/${params.uuid}`,
    title_form: "Update Data Masyarakat",
    delete_message: "Apakah anda yakin akan menghapus masyarakat tersebut?",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const nameProps = {
    handleChange: handleChange,
    label: "Nama",
    placeholder: "Masukkan Nama Lengkap",
    name: "name",
    type: "text",
    value: values.name,
  };

  const nikProps = {
    handleChange: handleChange,
    label: "NIK",
    placeholder: "Masukkan Nomor Induk Kependudukan",
    name: "nik",
    type: "text",
    value: values.nik,
  };

  const addressProps = {
    handleChange: handleChange,
    label: "Alamat",
    placeholder: "Masukkan Alamat Lengkap",
    name: "address",
    type: "text",
    value: values.address,
  };

  const phoneNumberProps = {
    handleChange: handleChange,
    label: "Nomor Telepon",
    placeholder: "Masukkan Nomor Telepon Yang Bisa Dihubungi",
    name: "phone_number",
    type: "text",
    value: values.phone_number,
  };

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const resp = await get_data(token, config.default_api);
      setValues({
        name: resp.data.name,
        nik: resp.data.nik,
        address: resp.data.address,
        phone_number: resp.data.phone_number,
      });
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
    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        config.default_api,
        "PUT",
        values
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
    title: config.delete_message,
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
        <Input props={nameProps} />
        <Input props={nikProps} />
        <Input props={addressProps} />
        <Input props={phoneNumberProps} />
      </LayoutForm>

      {open && <DeleteModal props={deleteProps} />}
    </>
  );
}
