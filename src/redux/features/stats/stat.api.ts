import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
       getStats: builder.query<any, void>({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<any, { role?: string; search?: string }>({
      query: ({ role, search } = {}) => ({
        url: `/user/allUsers${role || search ? "?" : ""}${
          role ? `filter=${role}` : ""
        }${role && search ? "&" : ""}${search ? `search=${search}` : ""}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    blockUser: builder.mutation<any, { id: string; block: boolean }>({
      query: ({ id, block }) => ({
        url: `/user/${id}/block`,
        method: "PATCH",
        data: { block },
      }),
      invalidatesTags: ["USER"],
    }),
    suspendDriver: builder.mutation<any, { id: string; suspend: boolean }>({
      query: ({ id, suspend }) => ({
        url: `/user/driver/${id}/approval`,
        method: "PATCH",
        data: { suspend },
      }),
      invalidatesTags: ["USER"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useSuspendDriverMutation,
  useGetStatsQuery
} = userApi;
