"use client";
import get_data from "actions/get_data";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainTable from "./table";
import { ProductTransaction } from "@/types/product_transaction";

export default function page() {
  const config = {
    api_load: "/shops/transactions",
    url_add: "transactions/add",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ProductTransaction[]>([]);

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

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <MainTable data={data} />
    </>
  );
}
