"use client";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import Loader from "@/components/Loader";
import get_data from "actions/get_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BasicCard from "@/components/Card/BasicCard";
import moment from "moment";
import post_data from "actions/post_data";
import axios from "axios";

function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.startsWith("08")) {
    return phoneNumber.replace(/^08/, "628");
  }
  return phoneNumber;
}

const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const ListItem = ({ name, value }: { name: string; value: any }) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-3">
      <p>{name} :</p>
      <p className="text-right font-medium text-black-2 dark:text-white">
        {value}
      </p>
    </div>
  );
};

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../transactions",
    back_push: "/umkm/transactions",
    default_endpoint: `/transactions/${params.uuid}`,
  };

  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const resp = await get_data(token, config.default_endpoint);
      setValues(resp.data);
      setIsCheck(true);
    } catch (error: any) {
      toast.error(error.message);
      router.push(config.back_push);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        `${config.default_endpoint}/accept`,
        "PATCH"
      );
      toast.success(response.message);
      router.push(config.back_push);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnaccept = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        `${config.default_endpoint}/unaccept`,
        "PATCH"
      );
      toast.success(response.message);
      router.push(config.back_push);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetProofImage = async (filename: string) => {
    if (!filename) {
      toast.error("Filename tidak ditemukan");
      return;
    }

    const accessToken = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: `${baseAPIUrl}/files/transaction_proofs/${filename}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(response.data);
      window.open(url, "_blank");
    } catch (error: any) {
      const message = error?.response?.data?.message
        ? error.response.data.message
        : error.message;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return !isCheck ? (
    <Loader />
  ) : (
    <>
      <div className="mx-5 inline-flex gap-2.5">
        <Link
          href={config.back_url}
          className="inline-flex items-center justify-center gap-2.5 bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 mb-4"
        >
          <span>
            <BackArrowIcon />
          </span>
          Kembali
        </Link>
      </div>
      <div className="grid md:grid-cols-2 px-5">
        <BasicCard title="Transaksi Produk">
          <div className="px-6.5 pt-5">
            <ListItem
              name="Tanggal Pembelian"
              value={moment.unix(values.created_at / 1000).format("D/M/YYYY")}
            />
            <ListItem name="Nama Produk" value={values?.product?.name} />
            <ListItem name="Nama Pembeli" value={values?.user?.name} />
            <ListItem name="Status Pembeli" value={values?.user?.role_name} />
            <ListItem name="Jumlah Yang Dibeli" value={values?.quantity} />
          </div>
          <div className="border-t border-stroke px-6.5 py-4 dark:border-strokedark">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <p>Kontak Pembeli :</p>
              <Link
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(
                  values?.user?.phone_number
                )}`}
                className="text-right font-medium text-primary hover:text-blue-800 hover:underline"
              >
                {values?.user?.phone_number}
              </Link>
            </div>
            {values?.proof_file ? (
              <ListItem
                name="Bukti Pembayaran"
                value={
                  <a
                    onClick={() => handleGetProofImage(values?.proof_file)}
                    href="#"
                    className="text-primary hover:text-blue-800"
                  >
                    Lihat
                  </a>
                }
              />
            ) : (
              <ListItem name="Bukti Pembayaran" value={"Belum Ada"} />
            )}
          </div>
          {values?.is_response ? (
            <div
              className={`text-center ${
                values?.is_accept ? "bg-primary" : "bg-danger"
              } py-3 text-white`}
            >
              {values?.is_accept ? "TRANSAKSI SELESAI" : "PEMBELIAN DITOLAK"}
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-6.5 mb-4">
              <button
                onClick={handleAccept}
                className="bg-primary px-5 py-2 text-white hover:bg-blue-800"
              >
                Transaksi Selesai
              </button>
              <button
                onClick={handleUnaccept}
                className="bg-danger px-5 py-2 text-white hover:bg-rose-700"
              >
                Tolak Pembelian
              </button>
            </div>
          )}
        </BasicCard>
        <div>
          <div className="bg-white dark:bg-boxdark md:w-5/6 mx-auto mt-3 md:mt-0">
            <div className="relative h-50 overflow-hidden bg-zinc-50">
              <img
                className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"
                src={`${baseAPIUrl}/files/products/${values?.product?.image_name}`}
                alt={`${values?.product?.name}`}
              />
            </div>
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              Stok Produk : <span>{values?.product?.stock}</span>
            </div>
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              Harga Produk : Rp.
              <span>
                {values?.product?.price}/{values?.product?.unit}
              </span>
            </div>
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              Ditambahkan Pada :{" "}
              <span>
                {moment.unix(values?.product?.created_at / 1000).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
