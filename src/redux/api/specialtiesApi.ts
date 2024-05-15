import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SpecialtiesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSpecialty: build.mutation({
            query: (data) => ({
                url: "/specialities",
                method: "POST",
                contentType: "multipart/form-data",
                data,
            }),
            invalidatesTags: [TagTypes.specialities],
        }),
        getAllSpecialties: build.query({
            query: () => ({
                url: "/specialities",
                method: "GET",
            }),
            providesTags: [TagTypes.specialities],
        }),
        deleteSpecialty: build.mutation({
            query: (id) => ({
                url: `/specialities/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TagTypes.specialities],
        }),
    }),
});

export const {
    useCreateSpecialtyMutation,
    useGetAllSpecialtiesQuery,
    useDeleteSpecialtyMutation,
} = SpecialtiesApi;
