import UserIcon from "@/components/Icons/UserIcon";
import React from "react";

interface Props {
  name: string;
  value?: string;
  handleChange?: (e: any) => void;
}

export default function Username({ props }: { props: Props }) {
  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Username
      </label>
      <div className="relative">
        <input
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          type="text"
          placeholder="Masukkan Username"
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />

        <span className="absolute right-4 top-4">
          <UserIcon />
        </span>
      </div>
    </div>
  );
}
