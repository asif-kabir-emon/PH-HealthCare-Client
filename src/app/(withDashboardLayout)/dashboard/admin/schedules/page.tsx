"use client";
import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import ScheduleModal from "./components/ScheduleModal";
import {
    useDeleteScheduleMutation,
    useGetAllSchedulesQuery,
} from "@/redux/api/scheduleApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import dateFormatter from "@/utils/dateFormatter";
import { toast } from "sonner";

const SchedulesPage = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [allSchedules, setAllSchedules] = React.useState<any>([]);
    const { data, isLoading } = useGetAllSchedulesQuery({
        sortBy: "startDateTime",
        sortOrder: "asc",
    });
    const [deleteSchedule] = useDeleteScheduleMutation();

    const schedules = data?.data?.schedules;
    const metaData = data?.data?.meta;

    useEffect(() => {
        const updatedData = schedules?.map(
            (schedule: {
                id: string;
                startDateTime: string;
                endDateTime: string;
            }) => {
                return {
                    id: schedule.id,
                    startDate: dateFormatter(schedule.startDateTime),
                    endDate: dateFormatter(schedule.endDateTime),
                    startTime: dayjs(schedule.startDateTime).format("HH:mm"),
                    endTime: dayjs(schedule.endDateTime).format("HH:mm"),
                };
            }
        );
        setAllSchedules(updatedData);
    }, [schedules]);

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteSchedule(id).unwrap();
            if (res.success) {
                toast.success(res?.message || "Schedule deleted successfully");
            }
        } catch (error: any) {
            alert("Failed to delete schedule");
        }
    };

    const columns: GridColDef[] = [
        {
            field: "startDate",
            headerName: "Start Date",
            flex: 1,
        },
        {
            field: "endDate",
            headerName: "End Date",
            flex: 1,
        },
        {
            field: "startTime",
            headerName: "Start Time",
            flex: 1,
        },
        {
            field: "endTime",
            headerName: "End Time",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <IconButton
                            aria-label="delete"
                            onClick={() => {
                                handleDelete(row.id);
                            }}
                        >
                            <DeleteIcon
                                sx={{
                                    color: "red",
                                }}
                            />
                        </IconButton>
                        <IconButton
                            aria-label="edit"
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                        >
                            <EditIcon sx={{}} />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box>
            <Button onClick={() => setIsModalOpen(true)}>
                Create Schedule
            </Button>
            <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
            <Box my={5}>Display Schedule</Box>
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid
                        rows={allSchedules ?? []}
                        columns={columns}
                        loading={isLoading}
                    />
                </Box>
            ) : (
                <Box>Loading...</Box>
            )}
        </Box>
    );
};

export default SchedulesPage;
