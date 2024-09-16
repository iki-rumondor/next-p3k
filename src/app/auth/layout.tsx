"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [isCheck, setIsCheck] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      redirect("/home");
    }
    setIsCheck(true);
  }, []);
  return isCheck ? children : null;
};

export default layout;
