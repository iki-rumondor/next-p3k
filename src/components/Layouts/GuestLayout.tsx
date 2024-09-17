"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DashboardIcon from "@/components/Icons/DashboardIcon";
import ListIcon from "@/components/Icons/ListIcon";
import ClipboardIcon from "@/components/Icons/ClipboardIcon";

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <DashboardIcon />,
        label: "Dashboard",
        route: "/guests/dashboard",
      },
      {
        icon: <DashboardIcon />,
        label: "Pembelian Produk",
        route: "/guests/transactions",
      },
    ],
  },
];
export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
