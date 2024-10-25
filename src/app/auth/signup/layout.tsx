import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo-dpkk.png"}
                  alt="Logo"
                  width={200}
                  height={1}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dpkk.png"}
                  alt="Logo"
                  width={200}
                  height={1}
                />
              </Link>

              <p className="2xl:px-20">
                Web Portal Kegiatan Dasawisma dan PKK Desa Tingkohubu
              </p>

              <span className="mt-15 inline-block">
                <Image
                  src={"/images/logo/undraw.svg"}
                  alt="Logo"
                  width={500}
                  height={1}
                />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Mendaftar Akun
              </h2>

              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
