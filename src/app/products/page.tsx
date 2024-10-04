"use client";
import { Product } from "@/types/product";
import get_data from "actions/get_data";
import { ProductCard } from "app/(home_partials)/product_card";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Product[]>([]);

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const response = await get_data("", "/public/products");
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
        Produk UMKM
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 sm:gap-3 gap-0">
        {data &&
          data.map((item) => (
            <ProductCard
              props={{
                uuid: item.uuid,
                name: item.name,
                price: item.price,
                stock: item.stock,
                image_name: item.image_name,
                category: item.category_name,
                unit: item.unit,
              }}
            />
          ))}
      </div>
    </section>
  );
}
