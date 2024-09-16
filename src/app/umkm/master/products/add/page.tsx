"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const defaultValue = {
  name: "",
  price: "",
  stock: "",
};

export default function page() {
  const config = {
    back_url: "../products",
    back_push: "/umkm/master/products",
    submit_api: "/products",
    title_form: "Tambah Data Produk",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(defaultValue);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const nameProps = {
    handleChange: handleChange,
    label: "Nama Produk",
    name: "name",
    type: "text",
    value: values.name,
  };

  const priceProps = {
    handleChange: handleChange,
    label: "Harga Produk",
    name: "price",
    type: "number",
    value: values.price,
  };

  const stockProps = {
    handleChange: handleChange,
    label: "Stok Produk",
    name: "stock",
    type: "text",
    value: values.stock,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    const price = parseInt(values.price);
    const stock = parseInt(values.stock);
    try {
      setIsLoading(true);
      const response = await post_data(token, config.submit_api, "POST", {
        ...values,
        price,
        stock,
      });
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
        <Input props={nameProps} />
        <Input props={priceProps} />
        <Input props={stockProps} />
      </LayoutForm>
    </>
  );
}
