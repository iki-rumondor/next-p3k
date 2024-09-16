"use client";
import PlusIcon from "@/components/Icons/PlusIcon";
import HomeHeader from "app/(home_partials)/header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <div className="bg-white min-h-screen">
      <div className="sticky top-0 z-50">
        <HomeHeader isLogin={isLogin} handleOpen={handleOpen} />
      </div>
      {children}
      {open && (
        <div className="fixed right-0 top-0 min-h-screen z-50 w-1/2 md:w-1/3 bg-whiter text-black shadow-lg p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="text-xl">Menu</div>
            <button onClick={() => setOpen(false)}>
              <PlusIcon />
            </button>
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <Link className="hover:text-black-2" href={"/"}>
              Beranda
            </Link>
            <Link className="hover:text-black-2" href={"/about"}>
              Tentang
            </Link>
            <Link className="hover:text-black-2" href={"/kegiatan"}>
              Kegiatan PKK
            </Link>
            <Link className="hover:text-black-2" href={"/products"}>
              Produk UMKM
            </Link>
          </div>
          <Link
            href={"/auth/login"}
            className="bg-black text-white hover:bg-black-2 font-bold py-1 px-2"
          >
            Icon Pintu Login
          </Link>
        </div>
      )}
    </div>
  );
}
