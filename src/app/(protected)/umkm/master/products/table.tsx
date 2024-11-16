import EyeIcon from "@/components/Icons/EyeIcon";
import { Product } from "@/types/product";
import Link from "next/link";
import React from "react";

interface TableProps {
  data: Product[];
}

const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const MainTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="border-b border-stroke pb-4 dark:border-strokedark mb-4">
          <h3 className="font-medium text-black dark:text-white">
            Master Produk
          </h3>
        </div>
        {data.length > 0 && (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Kategori
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Nama
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Harga
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Satuan
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Stok
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Gambar
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
                    <p className="text-black dark:text-white">{item.category_name}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.name}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.price}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.unit}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.stock}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <a
                      target="_blank"
                      href={`${baseAPIUrl}/files/products/${item.image_name}`}
                      className="text-sm text-white bg-primary px-2 py-1"
                    >
                      Lihat
                    </a>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link
                        href={`products/${item.uuid}`}
                        className="hover:text-primary"
                      >
                        <EyeIcon />
                      </Link>
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
