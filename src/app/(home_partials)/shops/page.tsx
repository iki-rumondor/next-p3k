"use client";
import { Umkm } from "@/types/umkm";
import get_data from "actions/get_data";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ShopCard } from "../shop_card";
import Input from "@/components/Forms/Input";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Umkm[]>([]);
  const [dataShow, setDataShow] = useState<Umkm[]>([]);

  const changeSearch = (e: any) => {
    const value = e.target.value;
    const newData = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.owner.toLowerCase().includes(value.toLowerCase())
      );
    });
    setDataShow(newData);
  };

  const searchProps = {
    label: "Cari Nama Toko atau Owner",
    type: "text",
    handleChange: changeSearch,
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const response = await get_data("", "/shops");
      if (response.data) {
        setData(response.data);
        setDataShow(response.data);
      }
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
    <section className="p-10">
      <div className="text-center text-title-xl2 font-medium text-black mb-10">
        Daftar UMKM
      </div>
      <div className="py-3">
        <Input props={searchProps} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 sm:gap-3 gap-0">
        {dataShow &&
          dataShow.map((item) => (
            <ShopCard
              key={item.uuid}
              props={{
                uuid: item.uuid,
                name: item.name,
                image_name: item.shop_image,
                owner: item.owner,
                address: item.address,
                phone_number: item.phone_number,
              }}
            />
          ))}
      </div>
    </section>
  );
}
