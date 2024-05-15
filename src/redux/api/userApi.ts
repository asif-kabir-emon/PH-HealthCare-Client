import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSingleUser: build.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: [TagTypes.user],
        }),
    }),
});

export const { useGetSingleUserQuery } = userApi;
