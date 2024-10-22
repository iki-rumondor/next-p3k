import React from "react";
import TransactionsReportTable from "./_internal/table";
import moment from "moment";
import PrintButton from "./_internal/print_button";

export default function Page() {
  return (
    <div className="bg-white p-3 min-h-screen">
      <div className="font-semibold text-title-lg mb-3 text-black-2">
        Laporan Kegiatan
      </div>
      <TransactionsReportTable />
      <div className="my-3 flex justify-between">
        <div>Dicetak tanggal: {moment().format("DD/MM/YYYY")}</div>
      </div>
      <PrintButton />
    </div>
  );
}
