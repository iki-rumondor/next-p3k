"use client";
import DashboardCard from "@/components/Card/DashboardCard";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import SolidLoading from "@/components/Icons/SolidLoading";
import SolidOpenBook from "@/components/Icons/SolidOpenBook";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Data {
  products: number;
  unprocess_transactions: number;
}

const defaultValue = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const defaultShopData = {
  uuid: "",
  name: "",
  owner: "",
  address: "",
  phone_number: "",
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingShop, setIsLoadingShop] = useState(false);
  const [data, setData] = useState<Data>();
  const [values, setValues] = useState(defaultValue);
  const [shopData, setShopData] = useState(defaultShopData);

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeShop = (e: any) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
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
    label: "Nama UMKM",
    name: "name",
    type: "text",
    value: shopData.name,
    handleChange: handleChangeShop,
  };

  const ownerName = {
    label: "Nama Pemilik UMKM",
    name: "owner",
    type: "text",
    value: shopData.owner,
    handleChange: handleChangeShop,
  };

  const phoneNumber = {
    label: "Nomor Handphone",
    name: "phone_number",
    type: "text",
    value: shopData.phone_number,
    handleChange: handleChangeShop,
  };

  const address = {
    label: "Alamat",
    name: "address",
    type: "text",
    value: shopData.address,
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

  const handleSubmitShopData = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoadingShop(true);
      const response = await post_data(
        token,
        `/shops/${shopData.uuid}`,
        "PUT",
        shopData
      );
      toast.success(response.message);
      location.reload();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingShop(false);
    }
  };

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await get_data(token, "/dashboard/shop");
      response.data && setData(response.data);
      const resp2 = await get_data(token, "/shops/user");
      resp2.data && setShopData(resp2.data);
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
            link="/umkm/master/products"
            color="blue"
            title="Jumlah Produk"
            body={`${data.products}`}
            icon={<SolidOpenBook className="text-white size-9" />}
          />
          <DashboardCard
            link="/umkm/master/products"
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
            isLoading={isLoadingShop}
            handleSubmit={handleSubmitShopData}
            title="Ubah Data"
          >
            <Input props={shopName} />
            <Input props={ownerName} />
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
