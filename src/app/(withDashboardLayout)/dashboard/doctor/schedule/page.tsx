"use client";
import { Box, Button, IconButton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import ScheduleModal from "./components/ScheduleModal";
import { useGetMyScheduleQuery } from "@/redux/api/doctorScheduleApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const SchedulePage = () => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const [allSchedules, setAllSchedules] = useState<any>([]);

    const query: Record<string, any> = {};
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    query["page"] = page;
    query["limit"] = limit;
    query["startDateTime"] = dayjs(new Date())
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString();

    const { data, isLoading } = useGetMyScheduleQuery({ ...query });
    const schedules = data?.data?.data;
    const meta = data?.data?.meta;

    let pageCount: number;

    if (meta?.total) {
        pageCount = Math.ceil(meta?.total / limit);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        const updatedData = schedules?.map((schedule: any, index: number) => ({
            id: schedule?.scheduleId,
            startDate: dayjs
                .utc(schedule?.schedule?.startDateTime)
                .local()
                .format("MM/DD/YYYY"),
            endDate: dayjs
                .utc(schedule?.schedule?.endDateTime)
                .local()
                .format("MM/DD/YYYY"),
            startTime: dayjs
                .utc(schedule?.schedule?.startDateTime)
                .local()
                .format("hh:mm A"),
            endTime: dayjs
                .utc(schedule?.schedule?.endDateTime)
                .local()
                .format("hh:mm A"),
        }));

        setAllSchedules(updatedData);
    }, [schedules]);

    const handleDelete = (id: string) => {};

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
                    <IconButton
                        aria-label="delete"
                        onClick={() => {
                            handleDelete(row?.id);
                        }}
                    >
                        <DeleteIcon
                            sx={{
                                color: "red",
                            }}
                        />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <Box>
            <Box>
                <Button
                    onClick={() => setIsModelOpen(true)}
                    endIcon={<AddIcon />}
                    sx={{
                        my: 2,
                    }}
                >
                    Create Doctor Schedule
                </Button>
                <ScheduleModal open={isModelOpen} setOpen={setIsModelOpen} />
            </Box>
            {!isLoading ? (
                <Box>
                    <DataGrid
                        rows={allSchedules ?? []}
                        columns={columns}
                        hideFooterPagination
                        slots={{
                            footer: () => {
                                return (
                                    <Box
                                        sx={{
                                            my: 2,
                                            mx: "auto",
                                        }}
                                    >
                                        <Pagination
                                            count={pageCount}
                                            page={page}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    </Box>
                                );
                            },
                        }}
                    />
                </Box>
            ) : (
                <Box>Loading...</Box>
            )}
        </Box>
    );
};

export default SchedulePage;
