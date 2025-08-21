
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
    ],
  },
  {
    title: "Tour Management",
    items: [
      // {
      //   title: "Add Tour Type",
      //   url: "/admin/add-tour-type",
      //   component: AddTourType,
      // },
    
    ],
  },
];
