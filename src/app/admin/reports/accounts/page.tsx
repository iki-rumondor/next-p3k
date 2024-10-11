"use client";
import BasicCard from "@/components/Card/BasicCard";
import Select from "@/components/Forms/Select";
import React, { useState } from "react";

const filters = [
  {
    name: "Akun Pembeli",
    value: "buyers",
  },
  {
    name: "Akun Penjual",
    value: "shops",
  },
];

export default function page() {
  const [filter, setFilter] = useState("");

  const filterProps = {
    value: filter,
    options: filters,
    name: "filter",
    label: "Pilih Jenis Laporan",
    handleChange: (e: any) => setFilter(e.target.value),
  };

  const handleClick = () => {
    const url = `/reports/accounts/?filter=${filter}`;
    window.open(url, "_blank");
  };

  const defaultButtonClass = "text-white px-3 py-1.5 inline-block";

  return (
    <div>
      <BasicCard title="Laporan Akun Marketplace">
        <div className="p-5">
          <Select props={filterProps} />
          <button
            onClick={handleClick}
            disabled={filter == ""}
            className={`${defaultButtonClass} ${
              filter ? "bg-primary hover:bg-blue-800" : "bg-slate-300"
            }`}
          >
            Lihat Laporan
          </button>
        </div>
      </BasicCard>
    </div>
  );
}
