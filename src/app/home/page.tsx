"use client";
import Loader from "@/components/Loader";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface TokenPayload {
  uuid: string;
  role: string;
  exp: number;
}

export default function page() {
  useEffect(() => {
    const token: string = localStorage.getItem("token") || "";
    if (token === "") {
      localStorage.clear();
      redirect("/auth/login");
    }

    const decodeToken = jwtDecode<TokenPayload>(token);

    if (decodeToken.exp * 1000 < Date.now()) {
      localStorage.clear();
      redirect("/auth/login");
    }

    if (decodeToken.role == "ADMIN") {
      redirect("/admin/dashboard");
    }

    if (decodeToken.role == "UMKM") {
      redirect("/umkm/dashboard");
    }

    if (decodeToken.role == "GUEST") {
      redirect("/guests/dashboard");
    }

    if (decodeToken.role == "MEMBER") {
      redirect("/members/dashboard");
    }

    localStorage.clear();
    redirect("/auth/login");
  }, []);

  return <Loader />;
}
