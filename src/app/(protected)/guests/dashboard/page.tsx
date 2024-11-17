"use client";
import DashboardCard from "@/components/Card/DashboardCard";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import SolidCheckBadge from "@/components/Icons/SolidCheckBadge";
import SolidLoading from "@/components/Icons/SolidLoading";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Data {
  success_transactions: number;
  unprocess_transactions: number;
  name: string;
  address: string;
  phone_number: string;
  uuid: string;
}

const defaultValue = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const defaultGuestData = {
  uuid: "",
  name: "",
  address: "",
  phone_number: "",
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGuest, setIsLoadingGuest] = useState(false);
  const [data, setData] = useState<Data>();
  const [values, setValues] = useState(defaultValue);
  const [guestData, setGuestData] = useState(defaultGuestData);

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeGuest = (e: any) => {
    setGuestData({ ...guestData, [e.target.name]: e.target.value });
  };

  const oldPassword = {
    label: "Password Lama",
    name: "old_password",
    type: "password",
    value: values.old_password,
    handleChange: handleChange,
  };

  const newPassword = {
    label: "Password Baru",
    name: "new_password",
    type: "password",
    value: values.new_password,
    handleChange: handleChange,
  };

  const confirmPassword = {
    label: "Konfirmasi Password",
    name: "confirm_password",
    type: "password",
    value: values.confirm_password,
    handleChange: handleChange,
  };

  const shopName = {
    label: "Nama",
    name: "name",
    type: "text",
    value: guestData.name,
    handleChange: handleChangeGuest,
  };

  const phoneNumber = {
    label: "Nomor Handphone",
    name: "phone_number",
    type: "text",
    value: guestData.phone_number,
    handleChange: handleChangeGuest,
  };

  const address = {
    label: "Alamat",
    name: "address",
    type: "text",
    value: guestData.address,
    handleChange: handleChangeGuest,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        "/users/password",
        "PATCH",
        values
      );
      toast.success(response.message);
      setValues(defaultValue);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitGuestData = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoadingGuest(true);
      const response = await post_data(
        token,
        `/guests/${guestData.uuid}`,
        "PUT",
        guestData
      );
      toast.success(response.message);
      location.reload();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingGuest(false);
    }
  };

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await get_data(token, "/dashboard/guest");
      if (response.data) {
        setData(response.data);
        setGuestData({
          address: response.data.address,
          name: response.data.name,
          uuid: response.data.uuid,
          phone_number: response.data.phone_number,
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="font-medium text-title-lg">Dashboard</div>
      {data && (
        <div className="grid grid-cols-2 gap-3">
          <DashboardCard
            link="/guests/transactions"
            color="green"
            title="Transaksi Berhasil"
            body={`${data.success_transactions}`}
            icon={<SolidCheckBadge className="text-white size-9" />}
          />
          <DashboardCard
            link="/guests/transactions"
            color="yellow"
            title="Transaksi Belum Diproses"
            body={`${data.unprocess_transactions}`}
            icon={<SolidLoading className="text-white size-9" />}
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <LayoutForm
            isLoading={isLoadingGuest}
            handleSubmit={handleSubmitGuestData}
            title="Ubah Data"
          >
            <Input props={shopName} />
            <Input props={phoneNumber} />
            <Input props={address} />
          </LayoutForm>
        </div>
        <div>
          <LayoutForm
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            title="Ubah Password"
          >
            <Input props={oldPassword} />
            <Input props={newPassword} />
            <Input props={confirmPassword} />
          </LayoutForm>
        </div>
      </div>
    </div>
  );
}
