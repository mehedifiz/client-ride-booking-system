import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<any, void>({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetStatsQuery } = statsApi;
