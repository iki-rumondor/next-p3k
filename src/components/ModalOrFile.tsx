"use client";

import { useState } from "react";
import NoteModal from "@/components/Modal/BasicModal";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  isHas: boolean;
  note?: string;
  feedback?: string;
  filename?: string;
  name: string;
}

const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default function ModalOrFile({ props }: { props: Props }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(!open);
  const accessToken = localStorage.getItem("token");

  const modalProps = {
    toggleModal: handleOpen,
    note: props.note || "-",
    feedback: props.feedback || "-",
  };

  const handleGetFile = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: `${baseAPIUrl}/file/${props.name}/${props.filename}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(response.data);
      window.open(url, "_blank");
    } catch (error: any) {
      const message = error?.response?.data?.message
        ? error.response.data.message
        : error.message;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {props.isHas ? (
        <button
          disabled={isLoading}
          onClick={handleGetFile}
          className="bg-primary hover:bg-blue-800 text-sm rounded-sm text-white px-3 py-1"
        >
          {isLoading ? "Loading..." : "Cek File"}
        </button>
      ) : (
        <button
          onClick={handleOpen}
          className="bg-primary hover:bg-blue-800 text-sm rounded-sm text-white px-3 py-1"
        >
          Lihat
        </button>
      )}
      {open && <NoteModal props={modalProps} />}
    </>
  );
}
