"use client";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VideocamIcon from "@mui/icons-material/Videocam";
import Link from "next/link";
import dateFormatter from "@/utils/dateFormatter";
import { getTimeIn12HourFormat } from "../../doctor/schedule/components/MultipleSelectFieldChip";
import PhChips from "@/components/Shared/PhChips/PhChips";
import { useRouter } from "next/navigation";
import { useInitialPaymentMutation } from "@/redux/api/paymentApi";
import { toast } from "sonner";

const PatientAppointmentsPage = () => {
    const router = useRouter();
    const [initialPayment] = useInitialPaymentMutation();
    const { data, isLoading } = useGetMyAppointmentsQuery({});
    const appointments = data?.data?.result;
    const meta = data?.data?.meta;
    console.log(data);

    const handlePayment = async (appointmentId: string) => {
        try {
            const response = await initialPayment(appointmentId).unwrap();
            console.log(response);

            if (response?.success && response?.data?.paymentUrl) {
                router.push(response?.data?.paymentUrl);
            } else {
                throw new Error(
                    response?.message || "Failed to Initiate Payment!"
                );
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to Book Appointment!");
        }
    };

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Doctor Name",
            flex: 1,
            renderCell: ({ row }) => {
                return row.doctor.name;
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
                return getTimeIn12HourFormat(row.schedule.startDateTime);
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
                    // <Button
                    //     variant="contained"
                    //     color="primary"
                    //     onClick={() => {
                    //         handlePayment(row.id);
                    //     }}
                    // >
                    //     Pay Now
                    // </Button>
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
                        component={Link}
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
