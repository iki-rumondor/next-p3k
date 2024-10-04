import ArrowUpIcon from "@/components/Icons/ArrowUpIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import Tooltip from "@/components/Tooltip";
import { ProductTransaction } from "@/types/product_transaction";
import moment from "moment";
import React from "react";

interface TableProps {
  data: ProductTransaction[];
  handleOpen: (id: string) => void;
  handleOpenUpload: (id: string) => void;
}

const MainTable: React.FC<TableProps> = ({
  data,
  handleOpen,
  handleOpenUpload,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="border-b border-stroke pb-4 dark:border-strokedark mb-4">
          <h3 className="font-medium text-black dark:text-white">
            Transaksi Pembelian Produk UMKM
          </h3>
        </div>
        {data.length > 0 && (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Nama Produk
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Jumlah
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Waktu Pembelian
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.product.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.quantity}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {moment.unix(item.created_at / 1000).fromNow()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`bg-primary inline-block px-2 py-1 text-sm text-white rounded-full ${
                        item.is_response
                          ? item.is_accept
                            ? "bg-success"
                            : "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {item.is_response
                        ? item.is_accept
                          ? "Sukses"
                          : "Ditolak"
                        : "Belum Diproses"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex gap-1">
                      {!item.proof_file && (
                        <>
                          <div className="flex items-center space-x-3.5">
                            <button
                              onClick={() => handleOpenUpload(item.uuid)}
                              className="hover:text-primary"
                            >
                              <Tooltip text="Upload Bukti Pembayaran">
                                <ArrowUpIcon />
                              </Tooltip>
                            </button>
                          </div>
                          <div>|</div>
                        </>
                      )}
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => handleOpen(item.uuid)}
                          className="hover:text-danger"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MainTable;
