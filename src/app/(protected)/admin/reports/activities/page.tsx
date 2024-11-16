"use client";
import BasicCard from "@/components/Card/BasicCard";
import Select from "@/components/Forms/Select";
import React, { useState } from "react";

const filters = [
  {
    name: "2024",
    value: "2024",
  },
  {
    name: "2023",
    value: "2023",
  },
  {
    name: "2022",
    value: "2022",
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
    const url = `/reports/activities/?filter=${filter}`;
    window.open(url, "_blank");
  };

  const defaultButtonClass = "text-white px-3 py-1.5 inline-block";

  return (
    <div>
      <BasicCard title="Laporan Kegiatan">
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
