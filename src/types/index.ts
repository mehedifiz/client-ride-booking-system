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

 

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "driver" | "rider";
  isBlocked: boolean;
  isSuspend?: boolean;
  availability?: string;
}

// Ride type
export interface IRide {
  _id: string;
  rider: {
    _id: string;
    name: string;
    email: string;
  };
  driver?: {
    _id: string;
    name?: string;
    email?: string;
  };
  status:
    | "requested"
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "cancelled";
  pickupLocation: { lat: number; lng: number };
  destinationLocation: { lat: number; lng: number };
  price: number;
  paymentStatus: "paid" | "unpaid";
  paymentMethod?: "online" | "cash";
  requestedAt: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  completedAt?: string;
}


export interface TResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    
}

export  type RideStatus =
  | "requested"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "cancelled";


  export const allowedTransitions: Record<RideStatus, RideStatus[]> = {
  requested: ["accepted"],
  accepted: ["picked_up", "cancelled"],
  picked_up: ["in_transit"],
  in_transit: ["completed"],
  completed: [],
  cancelled: [],
};