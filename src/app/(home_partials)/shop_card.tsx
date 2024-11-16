import Link from "next/link";
import React from "react";

interface Props {
  uuid: string;
  name: string;
  owner: string;
  address: string;
  phone_number: string;
  image_name: string;
}

const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const ShopCard = ({ props }: { props: Props }) => {
  return (
    <div className="relative bg-white shadow-md border border-gray-2 rounded-lg mb-5">
      <div className="relative h-50 overflow-hidden bg-whiten">
        <img
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"
          src={`${baseAPIUrl}/files/shops/${props?.image_name}`}
          alt={`${props?.name}`}
        />
      </div>
      <div className="p-5 flex flex-col gap">
        <h5 className="text-gray-900 font-bold text-xl tracking-tight">
          {props?.name}
        </h5>
        <small className="font-normal text-gray-700">
          Owner: {props?.owner}
        </small>
        <p className="font-normal text-gray-700 mt-1">
          No HP: {props.phone_number}
        </p>
        <p className="font-normal text-gray-700 mt-1">
          Alamat: {props.address}
        </p>
        <Link
          className="text-blue-700 hover:text-blue-800 font-medium rounded-lg text-sm mt-4"
          href={`products?shop=${props.uuid}`}
        >
          {"Lihat Produk >"}
        </Link>
      </div>
    </div>
  );
};
