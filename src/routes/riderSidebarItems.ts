import Allrides from "@/pages/allRides/Allrides";
import Bookings from "@/pages/rider/Bookings";
import { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Rides",
    items: [
      {
        title: "My Rides",
        url: "AllRides",
        component: Allrides,
      },
      {
        title: "My Rides",
        url: "/rider/myrides",
        component: Bookings,
      },
    ],
  },
];
