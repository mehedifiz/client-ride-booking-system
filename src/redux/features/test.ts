import { baseApi } from "../api/baseapi";

export const testApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getTest: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
   
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetTestQuery,  } = testApi;