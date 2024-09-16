"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  useEffect(() => {
    localStorage.clear();
    redirect("/auth/login");
  }, []);
}
