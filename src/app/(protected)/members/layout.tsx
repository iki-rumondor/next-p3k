"use client";
import MemberLayout from "@/components/Layouts/MemberLayout";
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
    if (decodeToken.role != "MEMBER") {
      redirect("/home");
    }
    setIsCheck(true);
  }, []);
  return !isCheck ? null : (
    <>
      <MemberLayout>
        <ReloadProvider>{children}</ReloadProvider>
      </MemberLayout>
    </>
  );
}
