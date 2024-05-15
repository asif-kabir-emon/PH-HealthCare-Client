import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSchedule: builder.mutation({
            query: (data) => ({
                url: "/schedule",
                method: "POST",
                data,
            }),
            invalidatesTags: [TagTypes.schedule],
        }),
        getAllSchedules: builder.query({
            query: (arg: Record<string, any>) => ({
                url: "/schedule",
                method: "GET",
                params: arg,
            }),
            providesTags: [TagTypes.schedule],
        }),
        deleteSchedule: builder.mutation({
            query: (id) => ({
                url: `/schedule/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TagTypes.schedule],
        }),
    }),
});

export const {
    useCreateScheduleMutation,
    useGetAllSchedulesQuery,
    useDeleteScheduleMutation,
} = scheduleApi;
