"use client";
import React, { useEffect, useState } from "react";
import MainTable from "./table";
import get_data from "actions/get_data";
import toast from "react-hot-toast";
import { Guest } from "@/types/guest";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<Guest[]>([]);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const resp = await get_data(token, `/guests`);
      resp.data && setValues(resp.data);
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
    <div className="flex flex-col gap-4">
      <MainTable data={values} />
    </div>
  );
}
