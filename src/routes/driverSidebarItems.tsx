import Bookings from "@/pages/rider/Bookings";
import { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Rides",
    items: [
      {
        title: "All Rides",
        url: "allrides",
        component: Bookings,
      },
    ],
  },
];
