import Link from "next/link";
import React from "react";

interface Props {
  uuid: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export const ProductCard = ({ props }: { props: Props }) => {
  return (
    <div className="relative bg-white shadow-md border border-gray-2 rounded-lg">
      <div className="relative">
        <img
          className="rounded-t-lg"
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
        />
        <p className="bottom-0 absolute m-4 px-3 py-1 bg-primary text-white rounded-full text-sm font-medium">
          {props?.category}
        </p>
      </div>
      <div className="p-5 flex flex-col gap">
        <h5 className="text-gray-900 font-bold text-xl tracking-tight">
          {props?.name}
        </h5>
        <small className="font-normal text-gray-700">
          Sisa Stok: {props?.stock}
        </small>
        <p className="font-normal text-gray-700 mt-1">Rp.{props?.price}</p>
        <Link
          className="text-blue-700 hover:text-blue-800 font-medium rounded-lg text-sm mt-4"
          href={`products/${props.uuid}`}
        >
          {"Belanja >"}
        </Link>
      </div>
    </div>
  );
};
