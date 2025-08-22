import Allrides from "@/pages/allRides/Allrides";
import Myrides from "@/pages/allRides/Myrides";
import { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Rides",
    items: [
      {
        title: "ALL Rides",
        url: "all-rides",
        component: Allrides,
      },
      {
        title: "My Rides",
        url: "/rider/myrides",
        component: Myrides,
      },
    ],
  },
];
