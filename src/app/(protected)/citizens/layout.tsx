"use client";
import CitizenLayout from "@/components/Layouts/CitizenLayout";
import { ReloadProvider } from "context/reload_context";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

interface TokenPayload {
  uuid: string;
  role: string;
  exp: number;
}

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
    const decodeToken = jwtDecode<TokenPayload>(token);
    if (decodeToken.role != "CITIZEN") {
      redirect("/home");
    }
    setIsCheck(true);
  }, []);
  return !isCheck ? null : (
    <>
      <CitizenLayout>
        <ReloadProvider>{children}</ReloadProvider>
      </CitizenLayout>
    </>
  );
}
