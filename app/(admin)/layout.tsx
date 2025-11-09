"use client";

import { ArrowBigLeft, ArrowBigRight, Layers, LayoutDashboard, Package, User, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  const [IsSidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [IsSidebarOpen, setSidebarOpen] = useState(true);

  const SidebarOpen = (): void=> {
    setSidebarOpen(!IsSidebarOpen);
  }

  const MenuItem = [
    {name: "Dashboard", href: "/admin/dashboard", icon: "dashboard"},
    {name: "Users", href: "/admin/users", icon: "users"},
    {name: "Product Categories", href: "/admin/product-categories", icon: "categories"},
    {name: "Products", href: "/admin/products", icon: "products"},
  ];

  return (
    <main>
      <div className="flex">
        <div className={`w-[300px] ${IsSidebarOpen ? "lg:w-[300px]" : "lg:w-[80]"} h-screen md:block hidden shadow-xl shadow-text-primary rounded-tr-lg transition-all duration-300 ease-in-out`}>
          <div className={`pt-3 flex ${IsSidebarOpen ? "justify-end" : "justify-center"} items-center px-2 pb-4`}>
            {IsSidebarOpen && <span className="font-bold text-lg w-full text-center">Admin Menu</span>}
            {IsSidebarOpen ? 
              <ArrowBigLeft onClick={SidebarOpen} />
              : <ArrowBigRight onClick={SidebarOpen} />
            }
          </div>
          <div className={`bg-primary h-screen rounded-tr-lg border-t-3 border-border overflow-hidden`}>
            {MenuItem.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className={`hover:bg-secondary flex gap-3 px-4 py-3 border-b border-border ${IsSidebarOpen ? "justify-start" : "justify-center"} items-center cursor-pointer`}>
                  {item.icon === "dashboard" && <LayoutDashboard />}
                  {item.icon === "users" && <Users />}
                  {item.icon === "categories" && <Layers />}
                  {item.icon === "products" && <Package />}
                  {IsSidebarOpen && <span>{item.name}</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full">
          <header className="h-10 border-b border-border ml-4">

          </header>
          {children}
        </div>
      </div>
    </main>
  );
}