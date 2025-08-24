import { baseApi } from "@/redux/baseApi";
import { IRide, TResponse } from "@/types";

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
    getMyRides: builder.query<TResponse<IRide[]>, void>({
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
    s: builder.query({
      query: () => ({
        url: "/ride/earningsHistory",
        method: "GET",
      }),
    }),
    // my rides
    driverRides: builder.query<TResponse<IRide[]>, void>({
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
      { rideId: string; status: IRide["status"]; payment?: boolean }
    >({
      query: ({ rideId, status, payment }) => ({
        url: `/ride/updateStatus/${rideId}`,
        method: "POST",
        data: { status, payment },
      }),
      invalidatesTags: ["RIDE"],
    }),

    getRidesAdmin: builder.query<
      TResponse<IRide[]>,
      {
        status?: string;
        driverId?: string;
        riderId?: string;
        from?: string;
        to?: string;
      } | void
    >({
      query: (filters) => ({
        url: "/ride/getRidersAdmin",
        method: "GET",
        params: filters,
      }),
      providesTags: ["RIDE"],
    }),


     getRideDetails: builder.query<any, string>({
      query: (rideId) => ({
        url: `/ride/details/${rideId}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
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
  useGetRidesAdminQuery,
  useGetRideDetailsQuery
} = rideApi;
