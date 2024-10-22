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
}

const defaultValue = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Data>();
  const [values, setValues] = useState(defaultValue);

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await get_data(token, "/dashboard/guest");
      response.data && setData(response.data);
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
      <div className="w-1/2">
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
  );
}
