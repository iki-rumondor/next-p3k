import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  body: string;
  color?: string;
  link: string;
  icon: React.ReactNode;
}

export default function DashboardCard({
  title,
  body,
  color,
  link,
  icon,
}: Props) {
  const classColor = {
    background: "bg-blue-500",
    text: "text-blue-600 hover:text-blue-700",
  };

  switch (color) {
    case "red":
      classColor.background = "bg-rose-500";
      classColor.text = "text-rose-600 hover:text-rose-700";
      break;
    case "green":
      classColor.background = "bg-green-500";
      classColor.text = "text-green-600 hover:text-green-700";
      break;
    case "yellow":
      classColor.background = "bg-yellow-500";
      classColor.text = "text-yellow-600 hover:text-yellow-700";
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center gap-5 p-6 transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow">
      <div
        className={`${classColor.background} flex items-center justify-center w-16 h-16 rounded-full shadow-inner`}
      >
        {icon}
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div>
          <h5 className="font-medium">{title}</h5>
          <p className="text-black-2 text-title-xxl2 font-medium">{body}</p>
        </div>
      </div>
      <Link
        href={`${link}`}
        className={`${classColor.text} flex items-center font-bold`}
      >
        Lihat
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </Link>
    </div>
  );
}
