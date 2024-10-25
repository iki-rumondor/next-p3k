"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DashboardIcon from "@/components/Icons/DashboardIcon";
import toast from "react-hot-toast";
import get_data from "actions/get_data";
import { Member } from "@/types/member";
import ClipboardIcon from "../Icons/ClipboardIcon";

const defaultMenuItems = [
  {
    icon: <DashboardIcon />,
    label: "Dashboard",
    route: "/members/dashboard",
  },
  {
    icon: <DashboardIcon />,
    label: "Kegiatan PKK",
    route: "/members/activities",
  },
];

const importantMenuItems = [
  {
    icon: <DashboardIcon />,
    label: "Dashboard",
    route: "/members/dashboard",
  },
  {
    icon: <DashboardIcon />,
    label: "Kegiatan PKK",
    route: "/members/activities",
  },
  {
    icon: <DashboardIcon />,
    label: "Validasi Absen",
    route: "/members/validation-activities",
  },
  {
    icon: <ClipboardIcon />,
    label: "Laporan",
    route: "#",
    children: [{ label: "Kegiatan", route: "/members/reports/activities" }],
  },
];

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [data, setData] = useState<Member | null>(null);
  const menuGroups = [
    {
      name: "MENU",
      menuItems: menuItems,
    },
  ];

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const response = await get_data(token, "/member/user");
      response.data && setData(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    if (data) {
      if (data.is_important) {
        setMenuItems(importantMenuItems);
      }
    }
  }, [data]);
  return (
    <>
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          menuGroups={menuGroups}
        />

        <div className="flex flex-1 flex-col lg:ml-72.5">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
