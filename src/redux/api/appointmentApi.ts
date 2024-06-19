import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAppointment: build.mutation({
            query: (data) => ({
                url: "/appointment",
                method: "POST",
                data,
            }),
            invalidatesTags: [TagTypes.appointment],
        }),
        getAllAppointments: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: "/appointment",
                    method: "GET",
                    params: arg,
                };
            },
            providesTags: [TagTypes.appointment],
        }),
        getMyAppointments: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: "/appointment/my-appointments",
                    method: "GET",
                    params: arg,
                };
            },
            providesTags: [TagTypes.appointment],
        }),
        getAppointment: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `/appointment/${id}`,
                method: "GET",
            }),
            providesTags: [TagTypes.appointment],
        }),
        appointmentStatusChange: build.mutation({
            query: (data) => ({
                url: `/appointment/status/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [TagTypes.appointment],
        }),
        deleteAppointment: build.mutation({
            query: (id) => ({
                url: `/appointment/soft/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TagTypes.appointment],
        }),
    }),
});

export const {
    useCreateAppointmentMutation,
    useGetAllAppointmentsQuery,
    useGetMyAppointmentsQuery,
    useGetAppointmentQuery,
    useAppointmentStatusChangeMutation,
    useDeleteAppointmentMutation,
} = appointmentApi;
