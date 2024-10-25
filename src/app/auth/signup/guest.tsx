"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import SpinnerIcon from "@/components/Icons/SpinnerIcon";
import Input from "@/components/Forms/Input";
import InputPassword from "@/components/Forms/InputPassword";

const defaultValue = {
  role_id: 4,
  fullname: "",
  address: "",
  phone_number: "",
  username: "",
  password: "",
  confirm_password: "",
};

export default function GuestForm() {
  const [values, setValues] = useState(defaultValue);
  const [confirmMassage, setConfirmMassage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fullnameProps = {
    label: "Masukkan Nama Lengkap",
    type: "text",
    name: "fullname",
    value: values.fullname,
    handleChange: handleChange,
  };

  const addressProps = {
    label: "Masukkan Alamat Rumah",
    type: "text",
    name: "address",
    value: values.address,
    handleChange: handleChange,
  };

  const phoneNumProps = {
    label: "Masukkan Nomor Handphone",
    type: "text",
    name: "phone_number",
    value: values.phone_number,
    handleChange: handleChange,
  };

  const usernameProps = {
    label: "Masukkan Username",
    type: "text",
    name: "username",
    value: values.username,
    handleChange: handleChange,
  };

  const passwordProps = {
    label: "Masukkan Password",
    type: "password",
    name: "password",
    value: values.password,
    handleChange: handleChange,
  };

  const confirmPassProps = {
    label: "Konfirmasi Password",
    type: "password",
    name: "confirm_password",
    value: values.confirm_password,
    handleChange: handleChange,
    errorMessage: confirmMassage,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register/guest`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      toast.success(response.data.message);
      router.push("/auth/login");
    } catch (error: any) {
      let message = error?.response?.data?.message || error.message;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (values.password != values.confirm_password) {
      setConfirmMassage("Password tidak sama");
    } else {
      setConfirmMassage("");
    }
  }, [values.confirm_password, values.password]);

  return (
    <form onSubmit={handleSubmit}>
      <Input props={fullnameProps} />
      <Input props={addressProps} />
      <Input props={phoneNumProps} />
      <Input props={usernameProps} />
      <InputPassword props={passwordProps} />
      <InputPassword props={confirmPassProps} />

      <button
        disabled={(isLoading && true) || confirmMassage != ""}
        className={`w-full rounded-lg border border-green-600 bg-green-600 p-4 text-white transition ${
          !isLoading && "hover:bg-opacity-90"
        }`}
        type="submit"
      >
        {isLoading ? <SpinnerIcon /> : <span className="">Daftarkan</span>}
      </button>
    </form>
  );
}
