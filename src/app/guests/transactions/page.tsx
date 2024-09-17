"use client";
import get_data from "actions/get_data";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainTable from "./table";
import { ProductTransaction } from "@/types/product_transaction";
import DeleteModal from "@/components/Modal/DeleteModal";
import post_data from "actions/post_data";

export default function page() {
  const config = {
    api_load: "/transactions",
    url_add: "transactions/add",
  };

  const [open, setOpen] = useState(false);
  const [selectID, setSelectID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<ProductTransaction[]>([]);

  const handleSelect = (id: string) => {
    setOpen(true);
    setSelectID(id);
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
      <MainTable data={data} handleOpen={handleSelect} />
      {open && <DeleteModal props={deleteProps} />}
    </>
  );
}
