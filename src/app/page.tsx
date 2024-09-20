"use client";
import Link from "next/link";
import HomeHeader from "./(home_partials)/header";
import { BlogCard } from "./(home_partials)/blog_card";
import { ProductCard } from "./(home_partials)/product_card";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
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
            <div className="text-title-xxl2 font-bold">
              Selamat Datang Di Website Resmi P3K Bone Bolango
            </div>
            <div className="text-lg font-medium w-2/3 m-auto">
              Media informasi untuk masyarakat bone bolango dalam mengetahui
              arsip lengkap dan jual beli produk umkm{" "}
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
          Produk UMKM
        </div>
        <div className="grid grid-cols-4 gap-3">
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
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
        <div className="grid grid-cols-3 gap-2">
          {/* <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard /> */}
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
