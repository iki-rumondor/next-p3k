import React from "react";

interface FormProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  handleSubmit?: (e: any) => void;
  colorButton?: string;
}

export default function LayoutForm({
  title,
  children,
  isLoading,
  handleSubmit,
  colorButton,
}: FormProps) {
  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">{title}</h3>
        </div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="p-6.5">
            {children}
            <button
              disabled={isLoading}
              className={`mt-6 flex w-full justify-center rounded ${
                colorButton || "bg-primary"
              } p-3 font-medium text-gray hover:bg-opacity-90`}
            >
              {isLoading ? "Loading..." : title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
