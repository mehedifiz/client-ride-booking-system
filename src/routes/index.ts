// import App from "@/App";
// // import DashboardLayout from "@/components/layout/DashboardLayout";
 
// import { generateRoutes } from "@/utils/generateRoutes";
// import { createBrowserRouter, Navigate } from "react-router";
 
// // import { role } from "@/constants/role";
// // import { TRole } from "@/types";

// export const router = createBrowserRouter([
//   {
//     Component: App,
//     path: "/",
//     children: [



      
//     ],
//   },
//   {
//     Component: withAuth(DashboardLayout, role.superAdmin as TRole),
//     path: "/admin",
//     children: [
//       { index: true, element: <Navigate to="/admin/analytics" /> },
//       ...generateRoutes(adminSidebarItems),
//     ],
//   },
//   {
//     Component: withAuth(DashboardLayout, role.user as TRole),
//     path: "/user",
//     children: [
//       { index: true, element: <Navigate to="/user/bookings" /> },
//       ...generateRoutes(userSidebarItems),
//     ],
//   },
//   {
//     Component: Login,
//     path: "/login",
//   },
//   {
//     Component: Register,
//     path: "/register",
//   },
//   {
//     Component: Verify,
//     path: "/verify",
//   },
//   {
//     Component: Unauthorized,
//     path: "/unauthorized",
//   },
// ]);