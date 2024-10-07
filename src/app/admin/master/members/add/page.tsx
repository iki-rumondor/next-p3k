"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Select from "@/components/Forms/Select";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const defaultValue = {
  name: "",
  is_important: true,
  position: "",
};

const positions = [
  { name: "DEWAN PEMBINA", is_important: true },
  { name: "PENASIHAT", is_important: true },
  { name: "KETUA", is_important: true },
  { name: "WAKIL KETUA", is_important: true },
  { name: "SEKRETARIS", is_important: true },
  { name: "WAKIL SEKRETARIS", is_important: true },
  { name: "BENDAHARA", is_important: true },
  { name: "WAKIL BENDAHARA", is_important: true },
  { name: "KETUA POKJA I", is_important: true },
  { name: "SEKRETARIS POKJA I", is_important: true },
  { name: "ANGGOTA POKJA I", is_important: false },
  { name: "KETUA POKJA II", is_important: true },
  { name: "SEKRETARIS POKJA II", is_important: true },
  { name: "ANGGOTA POKJA II", is_important: false },
  { name: "KETUA POKJA III", is_important: true },
  { name: "SEKRETARIS POKJA III", is_important: true },
  { name: "ANGGOTA POKJA III", is_important: false },
  { name: "KETUA POKJA IV", is_important: true },
  { name: "SEKRETARIS POKJA IV", is_important: true },
  { name: "ANGGOTA POKJA IV", is_important: false },
];

const isPositionImportant = (name: string): boolean => {
  const position = positions.find((p) => p.name === name);
  if (!position) {
    return false;
  }
  return position.is_important;
};

export default function page() {
  const config = {
    back_url: "../members",
    back_push: "/admin/master/members",
    submit_api: "/members",
    title_form: "Tambah Data Anggota",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(defaultValue);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePositionChange = (e: any) => {
    const is_important = isPositionImportant(e.target.value);
    setValues({
      ...values,
      position: e.target.value,
      is_important: is_important,
    });
  };

  const positionProps = {
    value: values.position,
    options: positions.map((item) => {
      return {
        name: item.name,
        value: item.name,
      };
    }),
    name: "position",
    label: "Pilih Jabatan",
    handleChange: handlePositionChange,
  };

  const nameProps = {
    handleChange: handleChange,
    label: "Nama",
    placeholder: "Masukkan Nama Lengkap",
    name: "name",
    type: "text",
    value: values.name,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        config.submit_api,
        "POST",
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
        <Select props={positionProps} />
        <Input props={nameProps} />
      </LayoutForm>
    </>
  );
}
