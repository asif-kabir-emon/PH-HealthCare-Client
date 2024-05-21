import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const profileAPi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyProfile: build.query({
            query: () => {
                return {
                    url: "/user/me",
                    method: "GET",
                };
            },
            providesTags: [TagTypes.user],
        }),
        updateMyProfile: build.mutation({
            query: (data) => {
                return {
                    url: "/user/update-my-profile",
                    method: "PATCH",
                    data,
                    contentType: "multipart/form-data",
                };
            },
            invalidatesTags: [TagTypes.user],
        }),
    }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = profileAPi;
