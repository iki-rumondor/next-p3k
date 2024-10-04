"use client";
import get_data from "actions/get_data";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainTable from "./table";
import { ProductTransaction } from "@/types/product_transaction";
import DeleteModal from "@/components/Modal/DeleteModal";
import post_data from "actions/post_data";
import BasicModal from "@/components/Modal/BasicModal";
import UploadInput from "@/components/Forms/UploadInput";

export default function page() {
  const config = {
    api_load: "/transactions",
    url_add: "transactions/add",
  };

  const [open, setOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [selectID, setSelectID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [proofFile, setProofFile] = useState<any | null>(null);
  const [data, setData] = useState<ProductTransaction[]>([]);

  const handleSelect = (id: string) => {
    setOpen(true);
    setSelectID(id);
  };

  const handleUpload = (id: string) => {
    setOpenUpload(true);
    setSelectID(id);
  };

  const uploadProps = {
    label: "Upload Bukti Pembayaran",
    handleChange: (e: any) => e.target.files && setProofFile(e.target.files[0]),
  };

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await get_data(token, config.api_load);
      response.data ? setData(response.data) : setData([]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!proofFile) {
      toast.error("File belum di upload");
      return;
    }
    const token = localStorage.getItem("token") || "";
    const data = new FormData();
    data.append("file", proofFile);
    try {
      setIsSuccess(false);
      setIsLoading(true);
      const response = await post_data(
        token,
        `/transactions/${selectID}/proof`,
        "PATCH",
        data,
        true
      );
      toast.success(response.message);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpenUpload(false);
      setProofFile(null);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsSuccess(false);
      setIsLoading(true);
      const response = await post_data(
        token,
        `/transactions/${selectID}`,
        "DELETE"
      );
      toast.success(response.message);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const deleteProps = {
    title: "Apakah yakin untuk menghapus transaksi pembelian produk tersebut?",
    toggleModal: () => {
      setOpen(false);
      setSelectID("");
    },
    handleSubmit: handleDelete,
    isLoading: isLoading,
  };

  useEffect(() => {
    handleLoad();
  }, [isSuccess]);

  return (
    <>
      <MainTable
        data={data}
        handleOpen={handleSelect}
        handleOpenUpload={handleUpload}
      />
      {open && <DeleteModal props={deleteProps} />}
      {openUpload && (
        <BasicModal props={{ toggleModal: () => setOpenUpload(!openUpload) }}>
          <form onSubmit={handleSubmit} method="POST">
            <UploadInput props={uploadProps} />
            <button className="bg-primary hover:bg-blue-800 px-3 py-2 text-white w-full mt-3">
              Upload
            </button>
          </form>
        </BasicModal>
      )}
    </>
  );
}
