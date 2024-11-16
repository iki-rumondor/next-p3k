"use client";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { Product } from "@/types/product";
import { Umkm } from "@/types/umkm";
import get_data from "actions/get_data";
import { ProductCard } from "app/(home_partials)/product_card";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const params = useSearchParams();
  const shopParam = params.get("shop") ?? "";
  const [shop, setShop] = useState(shopParam);

  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<Product[]>([]);
  const [dataShow, setDataShow] = useState<Product[]>([]);
  const [shopOptions, setShopOptions] = useState([]);

  const changeSearch = (e: any) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const newData = data.filter((item) => {
      return item.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setDataShow(newData);
  }, [keyword, setDataShow]);

  const changeShop = (e: any) => {
    setKeyword("");
    if (e.target.value == shop) {
      setShop("");
    } else {
      setShop(e.target.value);
    }
  };

  const searchProps = {
    label: "Cari Nama Produk",
    type: "text",
    handleChange: changeSearch,
    value: keyword,
  };

  const shopProps = {
    options: shopOptions,
    label: "Pilih Toko",
    value: shop,
    name: "shop",
    handleChange: changeShop,
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const resp2 = await get_data("", "/shops");
      if (resp2.data) {
        const option = resp2.data.map((item: Umkm) => {
          return {
            name: item.name,
            value: item.uuid,
          };
        });
        setShopOptions(option);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadProduct = async () => {
    try {
      setIsLoading(true);
      const response = await get_data("", `/public/products?shop=${shop}`);
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
    handleLoadProduct();
  }, [shop]);

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <section className="p-10">
      <div className="text-center text-title-xl2 font-medium text-black mb-10">
        Produk UMKM
      </div>
      <div className="py-3">
        <Select props={shopProps} />
        {shop && (
          <button
            className="bg-primary px-2 py-1 text-white mb-4"
            onClick={() => setShop("")}
          >
            Reset
          </button>
        )}
        <Input props={searchProps} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 sm:gap-3 gap-0">
        {dataShow &&
          dataShow.map((item) => (
            <ProductCard
              key={item.uuid}
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
