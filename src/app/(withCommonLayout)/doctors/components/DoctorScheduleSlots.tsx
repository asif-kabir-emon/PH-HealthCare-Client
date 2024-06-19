"use client";
import { getTimeIn12HourFormat } from "@/app/(withDashboardLayout)/dashboard/doctor/schedule/components/MultipleSelectFieldChip";
import { useGetAllDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import { DoctorSchedule } from "@/types";
import dateFormatter from "@/utils/dateFormatter";

import { Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
dayjs.extend(utc);

const DoctorScheduleSlots = ({ id }: { id: string }) => {
    const [scheduleId, setScheduleId] = useState("");

    const query: Record<string, any> = {};

    query["doctorId"] = id;

    query["startDateTime"] = dayjs(new Date())
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString();

    query["endDateTime"] = dayjs(new Date())
        .utc()
        .add(1, "day")
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999)
        .toISOString();

    query["limit"] = 100;

    const { data, isLoading } = useGetAllDoctorSchedulesQuery({ ...query });

    const doctorSchedules = data?.data?.schedules;

    const currentDate = new Date();
    const today = currentDate.toLocaleDateString("en-US", { weekday: "long" });

    const todayAvailableSlots = doctorSchedules?.filter(
        (schedule: DoctorSchedule) =>
            !schedule.isBooked &&
            schedule.schedule.endDateTime <
                dayjs(new Date())
                    .utc()
                    .hour(0)
                    .add(1, "day")
                    .minute(0)
                    .second(0)
                    .millisecond(0)
                    .toISOString()
    );

    const tomorrowAvailableSlots = doctorSchedules?.filter(
        (schedule: DoctorSchedule) =>
            !schedule.isBooked &&
            schedule.schedule.startDateTime >=
                dayjs(new Date())
                    .utc()
                    .hour(0)
                    .add(1, "day")
                    .minute(0)
                    .second(0)
                    .millisecond(0)
                    .toISOString()
    );

    const handleBookAppointment = async () => {};

    return (
        <Box mb={5}>
            <Box sx={{ bgcolor: "white", p: 3, mt: 1 }}>
                <Typography variant="h4" mb={3} color="primary.main">
                    Availability
                </Typography>
                <Typography variant="h6" fontSize={16}>
                    <b>
                        Today:{" "}
                        {dateFormatter(currentDate.toISOString()) + " " + today}
                    </b>
                </Typography>
                <Box
                    sx={{ borderBottom: "2px dashed #d0d0d0", mt: 2, mb: 3 }}
                />
                <Stack
                    direction="row"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                >
                    {todayAvailableSlots?.length ? (
                        isLoading ? (
                            "Loading..."
                        ) : (
                            todayAvailableSlots?.map(
                                (doctorSchedule: DoctorSchedule) => {
                                    const formattedTimeSlot = `${getTimeIn12HourFormat(
                                        doctorSchedule?.schedule?.startDateTime
                                    )} - ${getTimeIn12HourFormat(
                                        doctorSchedule?.schedule?.endDateTime
                                    )}`;

                                    return (
                                        <Button
                                            key={doctorSchedule?.scheduleId}
                                            color="primary"
                                            onClick={() =>
                                                setScheduleId(
                                                    doctorSchedule?.scheduleId
                                                )
                                            }
                                            variant={`${
                                                doctorSchedule?.scheduleId ===
                                                scheduleId
                                                    ? "contained"
                                                    : "outlined"
                                            }`}
                                        >
                                            {formattedTimeSlot}
                                        </Button>
                                    );
                                }
                            )
                        )
                    ) : (
                        <span style={{ color: "red" }}>
                            No Schedule is Available Today!
                        </span>
                    )}
                </Stack>
            </Box>

            <Box sx={{ bgcolor: "white", p: 3, mb: 1 }}>
                <Typography variant="h6" fontSize={16}>
                    <b>
                        Tomorrow:{" "}
                        {dateFormatter(
                            dayjs(currentDate).add(1, "day").toISOString()
                        ) +
                            " " +
                            dayjs(currentDate).add(1, "day").format("dddd")}
                    </b>
                </Typography>
                <Box
                    sx={{ borderBottom: "2px dashed #d0d0d0", mt: 2, mb: 3 }}
                />
                <Stack
                    direction="row"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                >
                    {tomorrowAvailableSlots?.length ? (
                        isLoading ? (
                            "Loading..."
                        ) : (
                            tomorrowAvailableSlots?.map(
                                (doctorSchedule: DoctorSchedule) => {
                                    const formattedTimeSlot = `${getTimeIn12HourFormat(
                                        doctorSchedule?.schedule?.startDateTime
                                    )} - ${getTimeIn12HourFormat(
                                        doctorSchedule?.schedule?.endDateTime
                                    )}`;

                                    return (
                                        <Button
                                            key={doctorSchedule?.scheduleId}
                                            color="primary"
                                            onClick={() =>
                                                setScheduleId(
                                                    doctorSchedule?.scheduleId
                                                )
                                            }
                                            variant={`${
                                                doctorSchedule?.scheduleId ===
                                                scheduleId
                                                    ? "contained"
                                                    : "outlined"
                                            }`}
                                        >
                                            {formattedTimeSlot}
                                        </Button>
                                    );
                                }
                            )
                        )
                    ) : (
                        <span style={{ color: "red" }}>
                            No Schedule is Available Today!
                        </span>
                    )}
                </Stack>
            </Box>

            <Button
                onClick={handleBookAppointment}
                sx={{ display: "block", mx: "auto" }}
            >
                Book Appointment Now
            </Button>
        </Box>
    );
};

export default DoctorScheduleSlots;
