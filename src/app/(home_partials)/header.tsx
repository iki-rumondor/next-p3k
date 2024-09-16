import ListIcon from "@/components/Icons/ListIcon";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import Link from "next/link";
import React from "react";

export default function HomeHeader({
  handleOpen,
  isLogin,
}: {
  handleOpen: () => void;
  isLogin: boolean;
}) {
  return (
    <div className="flex items-center justify-between w-full bg-black text-white font-medium text-md py-4 px-10">
      <div>Icon</div>
      <div className="gap-6 items-center md:flex hidden">
        <Link href={"/"}>Beranda</Link>
        <Link href={"/about"}>Tentang</Link>
        <Link href={"/kegiatan"}>Kegiatan PKK</Link>
        <Link href={"/products"}>Produk UMKM</Link>
        {isLogin ? (
          <Link
            href={"/home"}
            className="bg-white text-black hover:bg-whiter font-bold py-1 px-5"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href={"/auth/login"}
            className="flex bg-white text-black hover:bg-whiter font-bold py-1 px-5"
          >
            <span>Login</span>
            <LogoutIcon />
          </Link>
        )}
      </div>
      <button className="md:hidden block" onClick={handleOpen}>
        <ListIcon />
      </button>
    </div>
  );
}
