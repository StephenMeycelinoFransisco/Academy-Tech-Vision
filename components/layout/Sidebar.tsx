"use client";

import { BarChart4, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathName = usePathname();
  const sideBarRoutes = [
    { icon: <MonitorPlay />, label: "Courses", path: "/instructor/courses" },
    {
      icon: <BarChart4 />,
      label: "Performance",
      path: "/instructor/performance",
    },
  ];
  return (
    <div className="max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 text-sm gap-4 font-medium h-screen">
      {sideBarRoutes.map((route) => (
        <Link
          key={route.label}
          href={route.path}
          className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#FFF8EB] ${
            pathName.startsWith(route.path) &&
            "bg-[#FDAB04] hover:bg-[#FDAB04]/80"
          }`}
        >
          {route.icon}
          {route.label}
        </Link>
      ))}
    </div>
  );
}
