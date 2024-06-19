import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                data: loginData,
            }),
            invalidatesTags: [TagTypes.user],
        }),
        changePassword: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/change-password`,
                method: "POST",
                contentType: "application/json",
                data: data,
            }),
            invalidatesTags: [TagTypes.user],
        }),
        forgotPassword: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/forget-password`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [TagTypes.user],
        }),
        resetPassword: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [TagTypes.user],
        }),
    }),
});

export const {
    useUserLoginMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
