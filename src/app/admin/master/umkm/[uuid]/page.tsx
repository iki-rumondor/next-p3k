"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Select from "@/components/Forms/Select";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import Loader from "@/components/Loader";
import DeleteModal from "@/components/Modal/DeleteModal";
import { Category } from "@/types/category";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../umkm",
    back_push: "/admin/master/umkm",
    default_api: `/shops/${params.uuid}`,
    title_form: "Update Data UMKM",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const categories = await get_data(token, "/categories");
      if (categories.data) {
        const result = categories.data.map((item: Category) => {
          return { name: item.name, value: item.uuid };
        });
        setCategories(result);
      }

      const resp = await get_data(token, config.default_api);
      setValues({
        category_uuid: resp.data.category.uuid,
        name: resp.data.name,
        owner: resp.data.owner,
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
    title: "Apakah anda yakin akan menghapus data umkm tersebut?",
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
        <Select props={categoryProps} />
        <Input props={nameProps} />
        <Input props={ownerProps} />
        <Input props={addressProps} />
        <Input props={phoneNumberProps} />
      </LayoutForm>

      {open && <DeleteModal props={deleteProps} />}
    </>
  );
}
