import { baseApi } from "@/redux/baseApi";

// Ride type definition
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
  status: "requested" | "accepted" | "picked_up" | "in_transit" | "completed" | "cancelled";
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

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET all rides
    getAllRides: builder.query<IRide[], void>({
      query: () => ({
        url: "/ride/all",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

   // POST request a ride
requestRide: builder.mutation<IRide, {
  pickupLocation: { lat: number; lng: number };
  destinationLocation: { lat: number; lng: number };
  price: number;
}>({
  query: (rideInfo) => ({
    url: "/ride/request",
    method: "POST",
    data: rideInfo,  
  }),
  invalidatesTags: ["RIDE"],  
}),



  }),
  overrideExisting: false,
});

export const { useGetAllRidesQuery, useRequestRideMutation } = rideApi;
