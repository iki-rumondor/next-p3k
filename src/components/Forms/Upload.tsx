import React from "react";
import UploadIcon from "../Icons/UploadIcon";

interface Props {
  primary: string;
  secondary: string;
  handleChange: (e: any) => void;
}

export default function Upload({ props }: { props: Props }) {
  return (
    <div
      id="FileUpload"
      className="relative mb-4.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
    >
      <input
        onChange={props.handleChange}
        id="file"
        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
        type="file"
      />
      <div className="flex flex-col items-center justify-center space-y-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
          <UploadIcon />
        </span>
        <p>
          <span className="text-primary">Klik Untuk Upload</span> Atau Drag File
          Disini
        </p>
        <p className="mt-1.5">{props.primary} </p>
        <p>{props.secondary}</p>
      </div>
    </div>
  );
}
