import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const doctorScheduleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctorSchedule: build.mutation({
            query: (data) => ({
                url: "/doctor-schedule",
                method: "POST",
                data,
            }),
            invalidatesTags: [TagTypes.doctorSchedule],
        }),
        getAllDoctorSchedules: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: "/doctor-schedule",
                    method: "GET",
                    params: arg,
                };
            },
            providesTags: [TagTypes.doctorSchedule],
        }),
        getDoctorSchedule: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `/doctor-schedule/${id}`,
                method: "GET",
            }),
            providesTags: [TagTypes.doctorSchedule],
        }),
        getMySchedule: build.query({
            query: (arg: Record<string, any>) => ({
                url: "/doctor-schedule/my-schedules",
                method: "GET",
                params: arg,
            }),
            providesTags: [TagTypes.doctorSchedule],
        }),

        deleteDoctorSchedule: build.mutation({
            query: (id: string) => ({
                url: `/doctor-schedule/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TagTypes.doctorSchedule],
        }),
    }),
});

export const {
    useCreateDoctorScheduleMutation,
    useGetAllDoctorSchedulesQuery,
    useGetDoctorScheduleQuery,
    useGetMyScheduleQuery,
    useDeleteDoctorScheduleMutation,
} = doctorScheduleApi;
