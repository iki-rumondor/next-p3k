"use client";
import UmkmLayout from "@/components/Layouts/UmkmLayout";
import { ReloadProvider } from "context/reload_context";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCheck, setIsCheck] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.clear();
      redirect("/auth/login");
    }
    setIsCheck(true);
  }, []);
  return !isCheck ? null : (
    <>
      <UmkmLayout>
        <ReloadProvider>{children}</ReloadProvider>
      </UmkmLayout>
    </>
  );
}
