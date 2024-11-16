"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import Loader from "@/components/Loader";
import DeleteModal from "@/components/Modal/DeleteModal";
import { Guest } from "@/types/guest";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const defaultValue = {
  uuid: "",
  name: "",
  address: "",
  phone_number: "",
  user: {
    uuid: "",
    username: "",
    is_active: false,
  },
  created_at: 0,
  updated_at: 0,
};

export default function page({ params }: { params: { uuid: string } }) {
  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<Guest>(defaultValue);
  const router = useRouter();

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const res = await get_data(token, `/guests/${params.uuid}`);
      setValues(res.data);
    } catch (error: any) {
      toast.error(error.message);
      router.push("/admin/verify/guests");
      return;
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
        `/users/activation/${values.user.uuid}`,
        "PATCH",
        { status: !values.user.is_active }
      );
      toast.success(response.message);
      router.push("/admin/verify/guests");
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
      const response = await post_data(
        token,
        `/majors/${params.uuid}`,
        "DELETE"
      );
      toast.success(response.message);
      router.push("/admin/verify/guests");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const nameProps = {
    disable: true,
    label: "Nama Lengkap",
    value: values.name,
    type: "text",
  };

  const addressProps = {
    disable: true,
    label: "Alamat Rumah",
    value: values.address,
    type: "text",
  };

  const phoneNumProps = {
    disable: true,
    label: "Nomor Handphone",
    value: values.phone_number,
    type: "text",
  };

  const usernameProps = {
    disable: true,
    label: "Username",
    value: values.user.username,
    type: "text",
  };

  const deleteProps = {
    title:
      'Setelah anda menekan tombol "Ya", semua data terkait pembeli tersebut akan dihapus juga!!',
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
          href="../guests"
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
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        title={
          values.user.is_active
            ? "Nonaktifkan Akun Pembeli"
            : "Aktivasi Akun Pembeli"
        }
        colorButton={values.user.is_active ? "bg-danger" : "bg-success"}
      >
        <Input props={nameProps} />
        <Input props={addressProps} />
        <Input props={phoneNumProps} />
        <Input props={usernameProps} />
      </LayoutForm>

      {open && <DeleteModal props={deleteProps} />}
    </>
  );
}
