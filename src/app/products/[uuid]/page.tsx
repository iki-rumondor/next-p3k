"use client";
import Input from "@/components/Forms/Input";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import Loader from "@/components/Loader";
import BasicModal from "@/components/Modal/BasicModal";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../products",
    back_push: "/products",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<any>({});
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const quantityProps = {
    handleChange: (e: any) => setQuantity(e.target.value),
    label: "Jumlah Produk Yang Ingin Dibeli",
    name: "quantity",
    type: "number",
    placeholder: `Maks. ${values.stock}`,
    value: quantity,
  };

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const resp = await get_data(token, `/public/products/${params.uuid}`);
      setValues({
        name: resp.data.name,
        price: resp.data.price,
        stock: resp.data.stock,
        image_name: resp.data.image_name,
        umkm: resp.data?.shop?.name,
      });
      setIsCheck(true);
    } catch (error: any) {
      toast.error(error.message);
      router.push(config.back_push);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    if (!token) {
      toast.error("Silahkan login terlebih dahulu untuk melanjutkan");
      router.push("/auth/login");
      return;
    }
    try {
      const intQuantity = parseInt(quantity);
      setIsLoading(true);
      const response = await post_data(token, "/products/buy", "PATCH", {
        quantity: intQuantity,
        product_uuid: params.uuid,
      });
      toast.success(response.message);
      router.push(config.back_push);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return !isCheck ? (
    <Loader />
  ) : (
    <section className="p-10">
      <div className="inline-flex gap-2.5">
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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-8">
        <div>
          <img
            className=""
            src={`${baseAPIUrl}/files/products/${values?.image_name}`}
            alt={`${values?.name}`}
          />
        </div>
        <div className="flex items-end">
          <div>
            <div className="font-semibold text-title-xl text-black-2">
              {values?.name}
            </div>
            <div>Oleh: {values?.umkm}</div>
            <div className="font-medium text-xl text-zinc-500 mt-2">
              Rp. {values?.price}
            </div>
            <div className="mt-1">Sisa Stok : {values?.stock}</div>
            <div className="flex gap-3">
              <button
                onClick={() => setOpen(true)}
                className="bg-primary hover:bg-blue-800 px-7 py-2 text-white mt-6"
              >
                Beli Produk
              </button>
              {/* <button className="bg-warning hover:bg-yellow-700 px-7 py-2 text-white mt-6">
                Tambahkan Ke Favorit
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <BasicModal props={{ toggleModal: () => setOpen(!open) }}>
          <form onSubmit={handleSubmit} method="POST">
            <div className="text-title-md font-semibold mb-6">Beli Produk</div>
            <Input props={quantityProps} />
            <button
              type="submit"
              className="block w-full py-2 hover:bg-blue-800 bg-primary text-white"
            >
              Beli
            </button>
          </form>
        </BasicModal>
      )}
    </section>
  );
}
