"use client";

import Select from "@/components/Forms/Select";
import Link from "next/link";
import { useState } from "react";
import GuestForm from "./guest";
import ShopForm from "./shop";

export default function page() {
  const [role, setRole] = useState("4");

  const roleProps = {
    options: [
      { name: "Pembeli", value: "4" },
      { name: "Penjual", value: "3" },
    ],
    label: "Pilih Jenis Pengguna",
    name: "role_id",
    value: role,
    handleChange: (e: any) => setRole(e.target.value),
  };

  return (
    <>
      <Select props={roleProps} />
      {role == "4" && <GuestForm />}
      {role == "3" && <ShopForm />}
      <div className="mb-5">
        <div className="text-center mt-2">
          Sudah punya akun? silahkan{" "}
          <Link href="/auth/login" className="text-primary hover:text-blue-800">
            masuk
          </Link>{" "}
          ke sistem
        </div>
      </div>
    </>
  );
}
