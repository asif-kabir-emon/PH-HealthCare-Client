import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctor: build.mutation({
            query: (data) => ({
                url: "/user/create-doctor",
                method: "POST",
                contentType: "multipart/form-data",
                data,
            }),
            invalidatesTags: [TagTypes.doctor],
        }),
        getAllDoctors: build.query({
            query: (arg: Record<string, any>) => ({
                url: "/doctor",
                method: "GET",
                params: arg,
            }),
            providesTags: [TagTypes.doctor],
        }),
        deleteDoctor: build.mutation({
            query: (id) => ({
                url: `/doctor/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TagTypes.doctor],
        }),
        getDoctor: build.query({
            query: (id) => ({
                url: `/doctor/${id}`,
                method: "GET",
            }),
            providesTags: [TagTypes.doctor],
        }),
        updateDoctor: build.mutation({
            query: (data) => ({
                url: `/doctor/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [TagTypes.doctor],
        }),
    }),
});

export const {
    useCreateDoctorMutation,
    useGetAllDoctorsQuery,
    useDeleteDoctorMutation,
    useGetDoctorQuery,
    useUpdateDoctorMutation,
} = doctorApi;
