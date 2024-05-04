import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: () => ({}),
});
