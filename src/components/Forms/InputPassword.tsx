"use client";
import React, { useState } from "react";
import EyeIcon from "../Icons/EyeIcon";
import { EyeSlashIcon } from "../Icons/EyeSlashIcon";

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  disable?: boolean;
  value?: string | number;
  handleChange: (e: any) => void;
  errorMessage?: string;
}

export default function InputPassword({ props }: { props: InputProps }) {
  const [hide, setHide] = useState(true);
  return (
    <div className="mb-4.5">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {props.label}
      </label>
      <div className="relative">
        <input
          required
          onChange={props.handleChange}
          name={props.name}
          value={props?.value}
          disabled={props?.disable ?? false}
          type={hide ? "password" : "text"}
          placeholder={props?.placeholder || props.label}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <button
          type="button"
          className="hover:text-primary absolute inset-y-0 right-0 flex items-center px-3"
          onClick={() => setHide(!hide)}
        >
          {hide ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      </div>
      <small className="text-danger">{props?.errorMessage}</small>
    </div>
  );
}
