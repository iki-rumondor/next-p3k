"use client";
import { Activity } from "@/types/activity";
import get_data from "actions/get_data";
import { BlogCard } from "app/(home_partials)/blog_card";
import { ProductCard } from "app/(home_partials)/product_card";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Activity[]>([]);

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const response = await get_data("", "/activities");
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
    <section className="p-10">
      <div className="text-center text-title-xl2 font-medium text-black mb-10">
        Kegiatan PKK
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 sm:gap-5">
        {data &&
          data.map((item) => (
            <BlogCard
              props={{
                uuid: item.uuid,
                title: item.title,
                description: item.description,
                image_name: item.image_name,
                group: item.group,
              }}
            />
          ))}
      </div>
    </section>
  );
}
