"use client";

import React, { useEffect, useState } from "react";
import Username from "./partials/Username";
import Password from "./partials/Password";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import SpinnerIcon from "@/components/Icons/SpinnerIcon";
import Link from "next/link";

const defaultValue = {
  username: "",
  password: "",
};

export default function page() {
  const [values, setValues] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const usernameProps = {
    name: "username",
    value: values.username,
    handleChange: handleChange,
  };

  const passwordProps = {
    name: "password",
    value: values.password,
    handleChange: handleChange,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/verify-user`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      localStorage.setItem("token", response.data.data.token);
      router.push("/home");
    } catch (error: any) {
      let message = error?.response?.data?.message || error.message;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Username props={usernameProps} />
        <Password props={passwordProps} />

        <div className="mb-5">
          <button
            disabled={isLoading && true}
            className={`w-full rounded-lg border border-green-600 bg-green-600 p-4 text-white transition ${
              !isLoading && "hover:bg-opacity-90"
            }`}
            type="submit"
          >
            {isLoading ? <SpinnerIcon /> : <span className="">Masuk</span>}
          </button>
          <div className="text-center mt-2">
            Belum punya akun? silahkan{" "}
            <Link
              href="/auth/signup"
              className="text-green-600 hover:text-green-800"
            >
              mendaftar
            </Link>{" "}
            terlebih dahulu
          </div>
        </div>
      </form>
    </>
  );
}
