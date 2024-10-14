"use client";
import "../../styles.css";
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print mt-5 bg-primary hover:bg-blue-800 text-white px-3 py-1.5 inline-block"
    >
      Cetak Laporan
    </button>
  );
}
