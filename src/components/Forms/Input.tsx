import React from "react";

interface InputProps {
  label: string;
  type: string;
  name?: string;
  placeholder?: string;
  disable?: boolean;
  value?: string | number;
  handleChange?: (e: any) => void;
  errorMessage?: string;
}

export default function Input({ props }: { props: InputProps }) {
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
          type={props.type}
          placeholder={props?.placeholder || props.label}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      <small className="text-danger">{props?.errorMessage}</small>
    </div>
  );
}
