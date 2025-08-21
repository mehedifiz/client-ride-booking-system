import Bookings from "@/pages/rider/Bookings";
import { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Rides",
    items: [
      {
        title: "All Rides",
        url: "allrides",
        component: Bookings,
      },
      {
        title: "My Rides",
        url: "/rider/myrides",
        component: Bookings,
      },
    ],
  },
];
