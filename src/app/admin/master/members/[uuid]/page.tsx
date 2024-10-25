"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Select from "@/components/Forms/Select";
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

const positions = [
  { name: "KETUA", is_important: true },
  { name: "WAKIL KETUA", is_important: true },
  { name: "DEWAN PEMBINA", is_important: false },
  { name: "PENASIHAT", is_important: false },
  { name: "SEKRETARIS", is_important: false },
  { name: "WAKIL SEKRETARIS", is_important: false },
  { name: "BENDAHARA", is_important: false },
  { name: "WAKIL BENDAHARA", is_important: false },
  { name: "KETUA POKJA I", is_important: false },
  { name: "SEKRETARIS POKJA I", is_important: false },
  { name: "ANGGOTA POKJA I", is_important: false },
  { name: "KETUA POKJA II", is_important: false },
  { name: "SEKRETARIS POKJA II", is_important: false },
  { name: "ANGGOTA POKJA II", is_important: false },
  { name: "KETUA POKJA III", is_important: false },
  { name: "SEKRETARIS POKJA III", is_important: false },
  { name: "ANGGOTA POKJA III", is_important: false },
  { name: "KETUA POKJA IV", is_important: false },
  { name: "SEKRETARIS POKJA IV", is_important: false },
  { name: "ANGGOTA POKJA IV", is_important: false },
];

const isPositionImportant = (name: string): boolean => {
  const position = positions.find((p) => p.name === name);
  if (!position) {
    return false;
  }
  return position.is_important;
};

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../members",
    back_push: "/admin/master/members",
    default_api: `/members/${params.uuid}`,
    title_form: "Update Data Anggota",
    delete_message: "Apakah anda yakin akan menghapus anggota tersebut?",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const resp = await get_data(token, config.default_api);
      setValues({
        name: resp.data.name,
        group: resp.data.group,
        position: resp.data.position,
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
    const groupInt = parseInt(values.group);
    try {
      setIsLoading(true);
      const response = await post_data(token, config.default_api, "PUT", {
        ...values,
        group: groupInt,
      });
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
      const response = await post_data(
        token,
        `/master/members/${params.uuid}`,
        "DELETE"
      );
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
        <Select props={positionProps} />
        <Input props={nameProps} />
      </LayoutForm>

      {open && <DeleteModal props={deleteProps} />}
    </>
  );
}
