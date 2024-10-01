"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import SpinnerIcon from "@/components/Icons/SpinnerIcon";
import Input from "@/components/Forms/Input";
import InputPassword from "@/components/Forms/InputPassword";
import UploadInput from "@/components/Forms/UploadInput";

const defaultValue = {
  role_id: 3,
  shop_name: "",
  owner_name: "",
  address: "",
  phone_number: "",
  username: "",
  password: "",
  confirm_password: "",
};

export default function ShopForm() {
  const [values, setValues] = useState(defaultValue);
  const [confirmMassage, setConfirmMassage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [shopFile, setShopFile] = useState(null);
  const [identityFile, setIdentityFile] = useState(null);

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const shopNameProps = {
    label: "Masukkan Nama Toko",
    type: "text",
    name: "shop_name",
    value: values.shop_name,
    handleChange: handleChange,
  };

  const ownerNameProps = {
    label: "Masukkan Nama Penjual",
    type: "text",
    name: "owner_name",
    value: values.owner_name,
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

  const imageShopProps = {
    label: "Pilih Gambar Toko",
    handleChange: (e: any) => {
      e.target.files && setShopFile(e.target.files[0]);
    },
  };

  const imageIdentityProps = {
    label: "Pilih Gambar KTP",
    handleChange: (e: any) => {
      e.target.files && setIdentityFile(e.target.files[0]);
    },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (shopFile == null) {
      toast.error("Gambar Toko belum diupload");
      return;
    }

    if (identityFile == null) {
      toast.error("Gambar Ktp belum diupload");
      return;
    }

    const data = new FormData();
    data.append("role_id", values.role_id.toString());
    data.append("shop_name", values.shop_name);
    data.append("owner_name", values.owner_name);
    data.append("address", values.address);
    data.append("phone_number", values.phone_number);
    data.append("username", values.username);
    data.append("password", values.password);
    data.append("confirm_password", values.confirm_password);
    data.append("shop_image", shopFile);
    data.append("identity_image", identityFile);
    try {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register/shop`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
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
      <Input props={shopNameProps} />
      <Input props={ownerNameProps} />
      <Input props={addressProps} />
      <Input props={phoneNumProps} />
      <div className="mb-4.5">
        <UploadInput props={imageShopProps} />
      </div>
      <div className="mb-4.5">
        <UploadInput props={imageIdentityProps} />
      </div>
      <Input props={usernameProps} />
      <InputPassword props={passwordProps} />
      <InputPassword props={confirmPassProps} />

      <button
        disabled={(isLoading && true) || confirmMassage != ""}
        className={`w-full rounded-lg border border-primary bg-primary p-4 text-white transition ${
          !isLoading && "hover:bg-opacity-90"
        }`}
        type="submit"
      >
        {isLoading ? <SpinnerIcon /> : <span className="">Daftarkan</span>}
      </button>
    </form>
  );
}
