"use client";
import BasicCard from "@/components/Card/BasicCard";
import Select from "@/components/Forms/Select";
import get_data from "actions/get_data";
import React, { useEffect, useState } from "react";

export default function page() {
  const [filter, setFilter] = useState("");
  const [regions, setRegions] = useState<any[]>([]);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    const resp = await get_data(token, "/regions");
    setRegions(resp.data);
  }

  useEffect(() => {
    handleLoad();
  }, []);

  const filterProps = {
    value: filter,
    options: regions.map((item) => {
      return {
        name: item.Name,
        value: item.ID,
      };
    }),
    name: "filter",
    label: "Pilih Dusun",
    handleChange: (e: any) => setFilter(e.target.value),
  };

  const handleClick = () => {
    const url = `/reports/citizens/?region=${filter}`;
    window.open(url, "_blank");
  };

  const defaultButtonClass = "text-white px-3 py-1.5 inline-block";

  return (
    <div>
      <BasicCard title="Laporan Masyarakat">
        <div className="p-5">
          <Select props={filterProps} />
          <button
            onClick={handleClick}
            disabled={filter == ""}
            className={`${defaultButtonClass} ${filter ? "bg-primary hover:bg-blue-800" : "bg-slate-300"
              }`}
          >
            Lihat Laporan
          </button>
        </div>
      </BasicCard>
    </div>
  );
}
