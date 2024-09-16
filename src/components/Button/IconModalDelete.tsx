"use client";
import React, { useState } from "react";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import DeleteModal from "@/components/Modal/DeleteModal";
import post_data from "actions/post_data";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useReload } from "context/reload_context";

interface Props {
  endpoint: string;
  urlNext: string;
}

export const IconModalDelete = ({ props }: { props: Props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setReload } = useReload();
  const router = useRouter();

  const handleDelete = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setReload(false);
      setIsLoading(true);
      const response = await post_data(token, `${props.endpoint}`, "DELETE");
      toast.success(response.message);
      setReload(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const deleteProps = {
    title: "Apakah anda yakin akan menghapus data tersebut?",
    toggleModal: () => setOpen(!open),
    handleSubmit: handleDelete,
    isLoading: isLoading,
  };
  return (
    <>
      <button onClick={() => setOpen(!open)} className="hover:text-primary">
        <DeleteIcon />
      </button>
      {open && <DeleteModal props={deleteProps} />}
    </>
  );
};
