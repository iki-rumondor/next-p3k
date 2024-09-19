"use client";
import PlusIcon from "@/components/Icons/PlusIcon";
import get_data from "actions/get_data";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainTable from "./table";
import { Citizen } from "@/types/citizen";

export default function page() {
  const config = {
    api_load: "/citizens",
    url_add: "citizens/add",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Citizen[]>([]);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await get_data(token, config.api_load);
      response.data && setData(response.data);
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
        href={config.url_add}
        className="inline-flex items-center justify-center gap-2.5 bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 mb-4"
      >
        <span>
          <PlusIcon />
        </span>
        Tambah
      </Link>
      <MainTable data={data} />
    </>
  );
}
