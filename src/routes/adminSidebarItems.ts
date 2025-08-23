
import AllRides from "@/pages/allRides/Allrides";
import MyPtofile from "@/pages/MyPtofile";
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "dashboard",
        url: "/admin/dashboard",
        component: Analytics,
      },
      {
        title: "My Profile",
        url: "/admin/profile",
        component: MyPtofile,
      },
    ],
  },
  {
    title: "Rides",
    items: [
    {
        title: "All Rides",
        url: "all-rides",
        component: AllRides,
      },
    
    ],
  },
];
