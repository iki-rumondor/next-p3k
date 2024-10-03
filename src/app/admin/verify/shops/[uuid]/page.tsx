"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import Loader from "@/components/Loader";
import { Umkm } from "@/types/umkm";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page({ params }: { params: { uuid: string } }) {
  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<Umkm | null>(null);
  const router = useRouter();

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const res = await get_data(token, `/shops/${params.uuid}`);
      if (res.data) {
        setValues(res.data);
      }
    } catch (error: any) {
      toast.error(error.message);
      router.push("/admin/verify/shops");
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
        `/users/activation/${values?.user.uuid}`,
        "PATCH",
        { status: !values?.user.is_active }
      );
      toast.success(response.message);
      router.push("/admin/verify/shops");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const nameProps = {
    disable: true,
    label: "Nama Toko",
    value: values?.name,
    type: "text",
  };
  
  const ownerProps = {
    disable: true,
    label: "Nama Pemilik",
    value: values?.owner,
    type: "text",
  };

  const addressProps = {
    disable: true,
    label: "Alamat Rumah",
    value: values?.address,
    type: "text",
  };

  const phoneNumProps = {
    disable: true,
    label: "Nomor Handphone",
    value: values?.phone_number,
    type: "text",
  };

  const usernameProps = {
    disable: true,
    label: "Username",
    value: values?.user.username,
    type: "text",
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
          href="../shops"
          className="inline-flex items-center justify-center gap-2.5 bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 mb-4"
        >
          <span>
            <BackArrowIcon />
          </span>
          Kembali
        </Link>
      </div>
      <LayoutForm
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        title={
          values?.user.is_active
            ? "Nonaktifkan Akun Penjual"
            : "Aktivasi Akun Penjual"
        }
        colorButton={values?.user.is_active ? "bg-danger" : "bg-success"}
      >
        <Input props={nameProps} />
        <Input props={ownerProps} />
        <Input props={addressProps} />
        <Input props={phoneNumProps} />
        <Input props={usernameProps} />
      </LayoutForm>
    </>
  );
}
