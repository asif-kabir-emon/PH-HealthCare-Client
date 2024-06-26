"use client";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VideocamIcon from "@mui/icons-material/Videocam";
import Link from "next/link";
import { getTimeIn12HourFormat } from "../schedule/components/MultipleSelectFieldChip";
import dateFormatter from "@/utils/dateFormatter";
import PhChips from "@/components/Shared/PhChips/PhChips";

const PatientAppointmentsPage = () => {
    const { data, isLoading } = useGetMyAppointmentsQuery({});
    const appointments = data?.data?.result;
    const meta = data?.data?.meta;

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Patient Name",
            flex: 1,
            renderCell: ({ row }) => {
                return row?.patient?.name;
            },
        },
        {
            field: "contactNumber",
            headerName: "Contact Number",
            flex: 1,
            renderCell: ({ row }) => {
                return row?.patient?.contactNumber;
            },
        },
        {
            field: "appointmentDate",
            headerName: "Appointment Date",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ row }) => {
                return dateFormatter(row.schedule.startDateTime);
            },
        },
        {
            field: "appointmentTime",
            headerName: "Appointment Time",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ row }) => {
                return getTimeIn12HourFormat(row?.schedule?.startDateTime);
            },
        },

        {
            field: "paymentStatus",
            headerName: "Payment Status",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return row.paymentStatus === "PAID" ? (
                    <PhChips label={row.paymentStatus} type="success" />
                ) : (
                    <PhChips label={row.paymentStatus} type="warning" />
                );
            },
        },
        {
            field: "action",
            headerName: "Join",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <IconButton
                        href={`/video?videoCallingId=${row?.videoCallingId}`}
                        disabled={row.paymentStatus === "UNPAID"}
                    >
                        <VideocamIcon
                            sx={{
                                color:
                                    row.paymentStatus === "PAID"
                                        ? "primary.main"
                                        : "",
                            }}
                        />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <Box>
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid
                        rows={appointments ?? []}
                        columns={columns}
                        loading={isLoading}
                    />
                </Box>
            ) : (
                <h1>Loading.....</h1>
            )}
        </Box>
    );
};

export default PatientAppointmentsPage;
