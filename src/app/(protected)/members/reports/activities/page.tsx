"use client";
import BasicCard from "@/components/Card/BasicCard";
import Select from "@/components/Forms/Select";
import React, { useState } from "react";

const filters = [
  { value: 0, name: "KESELURUHAN" },
  { value: 1, name: "POKJA I (PENGHAYATAN DAN PENGALAMAN PANCASILA)" },
  { value: 2, name: "POKJA II (PENDIDIKAN DAN KETERAMPILAN)" },
  { value: 3, name: "POKJA III (PANGAN, SANDANG, DAN PERUMAHAN)" },
  {
    value: 4,
    name: "POKJA IV (KESEHATAN, KELESTARIAN LINGKUNGAN HIDUP, DAN PERENCANAAN SEHAT",
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
    const url = `/reports/activities/?group=${filter}`;
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
