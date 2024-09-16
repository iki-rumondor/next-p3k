import "@/css/satoshi.css";
import "@/css/style.css";
import { Metadata } from "next";
import React from "react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Web P3K | Bone Bolango",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </div>
      </body>
    </html>
  );
}
