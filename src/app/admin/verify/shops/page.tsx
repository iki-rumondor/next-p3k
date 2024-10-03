"use client";
import React, { useEffect, useState } from "react";
import MainTable from "./table";
import get_data from "actions/get_data";
import toast from "react-hot-toast";
import { Umkm } from "@/types/umkm";
import axios from "axios";

const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<Umkm[]>([]);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const resp = await get_data(token, `/shops`);
      resp.data && setValues(resp.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetShopImage = async (filename: string) => {
    if (!filename) {
      toast.error("Filename tidak ditemukan");
      return;
    }

    const accessToken = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: `${baseAPIUrl}/files/shops/${filename}`,
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

  const handleGetIdentityImage = async (filename: string) => {
    if (!filename) {
      toast.error("Filename tidak ditemukan");
      return;
    }

    const accessToken = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: `${baseAPIUrl}/files/identities/${filename}`,
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

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <MainTable
        data={values}
        handleGetShopImage={handleGetShopImage}
        handleGetIdentityImage={handleGetIdentityImage}
      />
    </div>
  );
}
