"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Select from "@/components/Forms/Select";
import Upload from "@/components/Forms/Upload";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import { Category } from "@/types/category";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const defaultValue = {
  name: "",
  price: "",
  stock: "",
  unit: "",
  category_uuid: "",
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
  const [categories, setCategories] = useState<
    { name: string; value: string }[]
  >([]);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e: any) => {
    e.target.files && setFile(e.target.files[0]);
  };

  const categoryProps = {
    options: categories,
    handleChange: handleChange,
    label: "Pilih Kategori Produk",
    name: "category_uuid",
    value: values.category_uuid,
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

  const unitProps = {
    handleChange: handleChange,
    label: "Satuan Produk",
    name: "unit",
    type: "text",
    value: values.unit,
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
    formData.append("category_uuid", values.category_uuid);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("unit", values.unit);

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

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await get_data(token, "/categories");
      response.data &&
        setCategories(
          response.data.map((item: Category) => {
            return {
              name: item.name,
              value: item.uuid,
            };
          })
        );
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
        <Input props={priceProps} />
        <Input props={stockProps} />
        <Input props={unitProps} />
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
