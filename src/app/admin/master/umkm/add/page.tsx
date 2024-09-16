"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Select from "@/components/Forms/Select";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import { Category } from "@/types/category";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const defaultValue = {
  category_uuid: "",
  name: "",
  owner: "",
  address: "",
  phone_number: "",
};

export default function page() {
  const config = {
    back_url: "../umkm",
    back_push: "/admin/master/umkm",
    submit_api: "/shops",
    title_form: "Tambah Data UMKM",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(defaultValue);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const categoryProps = {
    value: values.category_uuid,
    options: categories,
    name: "category_uuid",
    label: "Pilih Kategori Usaha",
    handleChange: handleChange,
  };

  const nameProps = {
    handleChange: handleChange,
    label: "Nama Usaha",
    name: "name",
    type: "text",
    value: values.name,
  };

  const ownerProps = {
    handleChange: handleChange,
    label: "Nama Pemilik Usaha",
    name: "owner",
    type: "text",
    value: values.owner,
  };

  const addressProps = {
    handleChange: handleChange,
    label: "Alamat",
    name: "address",
    type: "text",
    value: values.address,
  };

  const phoneNumberProps = {
    handleChange: handleChange,
    label: "Nomor Telepon",
    name: "phone_number",
    type: "text",
    value: values.phone_number,
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

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await get_data(token, "/categories");
      if (response.data) {
        const categories = response.data.map((item: Category) => {
          return { name: item.name, value: item.uuid };
        });
        setCategories(categories);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

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
        <Select props={categoryProps} />
        <Input props={nameProps} />
        <Input props={ownerProps} />
        <Input props={addressProps} />
        <Input props={phoneNumberProps} />
      </LayoutForm>
    </>
  );
}
