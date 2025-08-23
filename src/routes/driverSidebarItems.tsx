import AllRides from "@/pages/allRides/Allrides";
import MyAcceptedRides from "@/pages/allRides/MyAcceptedRides";
import EarningsHistory from "@/pages/rider/earningsHistory";
import { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Rides",
    items: [
      {
        title: "All Rides",
        url: "all-rides",
        component: AllRides,
      },
      {
        title: "My Accepted Rides",
        url: "accepted-rides",
        component: MyAcceptedRides,
      },

        {
       title: "Driver dashboard",
        url: "dashboard",
        component: EarningsHistory,
      },
    ],
  },
];
