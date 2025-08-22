import { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "driver" | "admin" | "rider";

export const allowedTransitions: Record<IRide["status"], IRide["status"][]> = {
  requested: ["accepted"],
  accepted: ["picked_up"],
  picked_up: ["in_transit"],
  in_transit: ["completed"],
  completed: [],
  cancelled: [],
};
