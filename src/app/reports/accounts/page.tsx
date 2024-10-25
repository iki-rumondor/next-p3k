"use client";
import React, { useEffect, useState } from "react";
import ShopsTable from "./shops_table";
import { Umkm } from "@/types/umkm";
import get_data from "actions/get_data";
import toast from "react-hot-toast";
import { Guest } from "@/types/guest";
import BuyersTable from "./buyers_table";
import { useSearchParams } from "next/navigation";
import "../styles.css";
import moment from "moment";

export default function page() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const [umkm, setUmkm] = useState<Umkm[]>([]);
  const [guest, setGuest] = useState<Guest[]>([]);

  const handleLoad = async () => {
    const endpoint = filter == "shops" ? "/shops" : "/guests";
    const token = localStorage.getItem("token") || "";
    try {
      const resp = await get_data(token, endpoint);
      if (filter == "shops") {
        resp.data && setUmkm(resp.data);
      } else {
        resp.data && setGuest(resp.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="bg-white p-3 min-h-screen">
      <div className="font-semibold text-title-lg mb-3 text-black-2">
        Laporan Akun
      </div>
      {filter == "shops" ? (
        <ShopsTable data={umkm} />
      ) : (
        <BuyersTable data={guest} />
      )}
      <div className="my-3 flex justify-between">
        <div>Dicetak tanggal: {moment().format("DD/MM/YYYY")}</div>
      </div>
      <button
        onClick={() => window.print()}
        disabled={filter == ""}
        className="no-print mt-5 bg-primary hover:bg-blue-800 text-white px-3 py-1.5 inline-block"
      >
        Cetak Laporan
      </button>
    </div>
  );
}
