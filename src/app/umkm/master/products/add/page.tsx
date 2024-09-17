"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Upload from "@/components/Forms/Upload";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import post_data from "actions/post_data";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const defaultValue = {
  name: "",
  price: "",
  stock: "",
};

const convertToMB = (bytes: number) => {
  const size = (bytes / (1024 * 1024)).toFixed(2);
  return `${size} MB`;
};

export default function page() {
  const config = {
    back_url: "../products",
    back_push: "/umkm/master/products",
    submit_api: "/products",
    title_form: "Tambah Data Produk",
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
    type: "number",
    value: values.stock,
  };

  const uploadProps = {
    primary: "File Harus Dalam Format Gambar",
    secondary: "(Ukuran Max: 1MB)",
    handleChange: handleChangeFile,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("stock", values.stock);

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
        <Input props={nameProps} />
        <Input props={priceProps} />
        <Input props={stockProps} />
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
          <Upload props={uploadProps} />
        )}
      </LayoutForm>
    </>
  );
}
