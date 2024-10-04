import Link from "next/link";
import React from "react";

interface Props {
  uuid: string;
  title: string;
  description: string;
  image_name: string;
  group: number;
}

const groups = ["POKJA I", "POKJA II", "POKJA III", "POKJA IV"];
const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const BlogCard = ({ props }: { props: Props }) => {
  return (
    <div className="relative bg-white shadow-md border border-gray-2 rounded-lg mb-5">
      <div className="relative h-50 overflow-hidden">
        <img
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"
          src={`${baseAPIUrl}/files/activities/${props?.image_name}`}
          alt={`${props?.title}`}
        />
        <p className="bottom-0 absolute m-4 px-3 py-1 bg-warning text-white rounded-full text-sm font-medium">
          {groups[props?.group - 1]}
        </p>
      </div>
      <div className="p-5">
        <a href="#">
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
            {props?.title}
          </h5>
        </a>
        <p className="font-normal text-gray-700 mb-3 blog-description">
          {props?.description}
        </p>
        <Link
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-sm text-sm px-3 py-2 text-center inline-flex items-center"
          href={`activities/${props.uuid}`}
        >
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
};
