"use client";
import BasicCard from "@/components/Card/BasicCard";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Select from "@/components/Forms/Select";
import Textarea from "@/components/Forms/Textarea";
import Upload from "@/components/Forms/Upload";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import Loader from "@/components/Loader";
import DeleteModal from "@/components/Modal/DeleteModal";
import { Member } from "@/types/member";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const convertToMB = (bytes: number) => {
  const size = (bytes / (1024 * 1024)).toFixed(2);
  return `${size} MB`;
};

const groups = [
  { value: 1, name: "POKJA I (PENGHAYATAN DAN PENGALAMAN PANCASILA)" },
  { value: 2, name: "POKJA II (PENDIDIKAN DAN KETERAMPILAN)" },
  { value: 3, name: "POKJA III (PANGAN, SANDANG, DAN PERUMAHAN)" },
  {
    value: 4,
    name: "POKJA IV (KESEHATAN, KELESTARIAN LINGKUNGAN HIDUP, DAN PERENCANAAN SEHAT",
  },
];

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../activities",
    back_push: "/admin/activities",
    default_api: `/activities/${params.uuid}`,
    title_form: "Update Data Kegiatan",
    delete_title: "Apakah anda yakin akan menghapus data kegiatan tersebut?",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<any>({});
  const [file, setFile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [reload, setReload] = useState(false);
  const [options, setOptions] = useState([]);
  const [memberSelect, setSelectMember] = useState("");

  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (e: any) => {
    const value = moment(e.target.value, "YYYY-MM-DD").valueOf();
    setValues({ ...values, [e.target.name]: value });
  };

  const handleChangeFile = (e: any) => {
    e.target.files && setFile(e.target.files[0]);
  };

  const groupProps = {
    value: values.group,
    options: groups.map((item) => {
      return {
        name: item.name,
        value: item.value,
      };
    }),
    name: "group",
    label: "Pilih Kelompok Kerja",
    handleChange: handleChange,
  };

  const titleProps = {
    handleChange: handleChange,
    label: "Judul Kegiatan",
    placeholder: "Masukkan Judul Kegiatan",
    name: "title",
    type: "text",
    value: values.title,
  };

  const locationProps = {
    handleChange: handleChange,
    label: "Lokasi Kegiatan",
    placeholder: "Masukkan Lokasi Kegiatan",
    name: "location",
    type: "text",
    value: values.location,
  };

  const startProps = {
    handleChange: handleChange,
    label: "Tanggal Mulai Kegiatan",
    placeholder: "Masukkan Tanggal Kegiatan",
    name: "start_time",
    type: "datetime-local",
    value: values.start_time,
  };

  const endProps = {
    handleChange: handleChange,
    label: "Tanggal Selesai Kegiatan",
    placeholder: "Masukkan Tanggal Kegiatan",
    name: "end_time",
    type: "datetime-local",
    value: values.end_time,
  };

  const descriptionProps = {
    handleChange: handleChange,
    label: "Deskripsi Kegiatan",
    placeholder: "Masukkan Deskripsi Kegiatan",
    name: "description",
    value: values.description,
    rows: 7,
  };

  const uploadProps = {
    primary: "File Harus Dalam Format Gambar",
    secondary: "(Ukuran Max: 1MB)",
    handleChange: handleChangeFile,
  };

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const resp = await get_data(token, config.default_api);
      setValues(resp.data);
      const resp2 = await get_data(
        token,
        `/members/not/activities/${params.uuid}`
      );
      if (resp2.data) {
        setOptions(
          resp2.data.map((item: Member) => {
            return {
              name: item.name,
              value: item.uuid,
            };
          })
        );
      } else {
        setOptions([]);
      }
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
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", values.title);
    formData.append("group", values.group);
    formData.append("description", values.description);
    formData.append("location", values.location);
    
    const startTime = moment(values.start_time, "YYYY-MM-DD HH:mm").valueOf();
    formData.append("start_time", startTime.toString());

    const endTime = moment(values.end_time, "YYYY-MM-DD HH:mm").valueOf();
    formData.append("end_time", endTime.toString());

    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        config.default_api,
        "PUT",
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
    title: config.delete_title,
    toggleModal: () => setOpen(!open),
    handleSubmit: handleDelete,
    isLoading: isLoading,
  };

  useEffect(() => {
    handleLoad();
  }, [reload]);

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
        <Select props={groupProps} />
        <Input props={titleProps} />
        <Textarea props={descriptionProps} />
        <Input props={locationProps} />
        <Input props={startProps} />
        <Input props={endProps} />
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
          <>
            <div className="mb-3 block text-sm font-medium text-black dark:text-white">
              Pilih Gambar Kegiatan
            </div>
            <Upload props={uploadProps} />
          </>
        )}
        <div className="mt-5 pt-3 border-t border-stroke text-sm">
          <div>
            Diubah Oleh : <span>{values?.updated_user?.name}</span>
          </div>
          <div>
            Diubah Pada :{" "}
            <span>{moment.unix(values.updated_at / 1000).fromNow()}</span>
          </div>
        </div>
      </LayoutForm>

      {open && <DeleteModal props={deleteProps} />}
    </>
  );
}
