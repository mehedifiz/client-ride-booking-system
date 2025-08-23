import { baseApi } from "@/redux/baseApi";

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

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRides: builder.query<IRide[], void>({
      query: () => ({
        url: "/ride/all",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    requestRide: builder.mutation<
      IRide,
      {
        pickupLocation: { lat: number; lng: number };
        destinationLocation: { lat: number; lng: number };
        price: number;
      }
    >({
      query: (rideInfo) => ({
        url: "/ride/request",
        method: "POST",
        data: rideInfo,
      }),
      invalidatesTags: ["RIDE"],
    }),

    // my rides
    getMyRides: builder.query<IRide[], void>({
      query: () => ({
        url: "/ride/myRides",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
    // my rides
    earningsHistory: builder.query({
      query: () => ({
        url: "/ride/earningsHistory",
        method: "GET",
      }),
      
    }),
    // my rides
    driverRides: builder.query<any, void>({
      query: () => ({
        url: "/ride/my-accepted",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    // cancel
    cancelRide: builder.mutation<IRide, string>({
      query: (rideId) => ({
        url: `/ride/cancelRide/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),

     
    updateRideStatus: builder.mutation<
      any,
      { rideId: string; status: IRide["status"] ; payment?: boolean }
    >({
      query: ({ rideId, status ,payment}) => ({
        url: `/ride/updateStatus/${rideId}`,
        method: "POST",
        data: { status , payment },
      }),
      invalidatesTags: ["RIDE"],
    }),



    
  }),

  overrideExisting: false,
});

export const {
  useGetAllRidesQuery,
  useRequestRideMutation,
  useGetMyRidesQuery,
  useCancelRideMutation,
  useUpdateRideStatusMutation,  
  useDriverRidesQuery,
  useEarningsHistoryQuery,
} = rideApi;
