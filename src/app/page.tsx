"use client";
import Link from "next/link";
import HomeHeader from "./(home_partials)/header";
import { BlogCard } from "./(home_partials)/blog_card";
import { ProductCard } from "./(home_partials)/product_card";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Activity } from "@/types/activity";
import get_data from "actions/get_data";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res1 = await get_data("", "/public/products?limit=8");
      res1.data && setProducts(res1.data);

      const res2 = await get_data("", "/activities?limit=6");
      res2.data && setActivities(res2.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
    handleLoad();
  }, []);

  return (
    <div className="bg-white">
      <div className="sticky top-0 z-50">
        <HomeHeader isLogin={isLogin} handleOpen={handleOpen} />
      </div>
      <div className="h-screen flex flex-col">
        <div className="relative flex-grow bg-homepage bg-no-repeat bg-cover bg-center h-full flex justify-center items-center text-white">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="flex flex-col text-center gap-2 z-10">
            <div className="text-title-xxl2 font-bold w-2/3 m-auto">
              Selamat Datang di Web Portal Kegiatan Dasawisma dan PKK Desa
              Tingkohubu
            </div>
            <div className="text-lg font-medium w-2/3 m-auto">
              Media informasi Kegiatan Dasawisma dan PKK dan jual beli produk
              UMKM Desa Tingkohubu
            </div>
            {/* <div>
              <Link
                className="hover:bg-blue-700 bg-black px-5 py-2 inline-flex text-md mt-4 font-medium"
                href={"/test"}
              >
                Login Pengguna
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <section className="p-10 mt-10">
        <div className="text-center text-title-xl2 font-medium text-black mb-10">
          Tentang
        </div>
        <div className="grid grid-cols-2 gap-1 items-center">
          <div>
            <Image
              src={"/images/test-img.jpeg"}
              alt="about-image"
              width={500}
              height={1}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="font-semibold text-lg">Visi</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
                ea blanditiis recusandae, eaque fuga id dolorem dignissimos
                tempore ratione earum, doloremque repellendus dolores laborum
                optio ipsam fugiat. Aliquid, est nostrum!
              </div>
            </div>
            <div>
              <div className="font-semibold text-lg">Misi</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
                ea blanditiis recusandae, eaque fuga id dolorem dignissimos
                tempore ratione earum, doloremque repellendus dolores laborum
                optio ipsam fugiat. Aliquid, est nostrum!
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10 mt-10">
        <div className="text-center text-title-xl2 font-medium text-black mb-10">
          Produk UMKM
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 sm:gap-3 gap-0">
          {products &&
            products.map((item) => (
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
        <div className="w-full mt-10 text-center text-md bg-primary text-white py-2">
          <Link href={"/products"} className="w-full block">
            Selengkapnya..
          </Link>
        </div>
      </section>
      <section className="p-10 mt-10">
        <div className="text-center text-title-xl2 font-medium text-black mb-10">
          Arsip Kegiatan
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 sm:gap-5">
          {activities &&
            activities.map((item) => (
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
        <div className="w-full mt-10 text-center text-md bg-primary text-white py-2">
          <Link href={"/activities"} className="w-full block">
            Selengkapnya..
          </Link>
        </div>
      </section>
    </div>
  );
}
