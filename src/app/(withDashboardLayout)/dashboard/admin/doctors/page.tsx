"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import DoctorModal from "./components/DoctorModal";
import {
    useDeleteDoctorMutation,
    useGetAllDoctorsQuery,
} from "@/redux/api/doctorApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDebounced } from "@/redux/hooks";
import { toast } from "sonner";
import Link from "next/link";

const DoctorsPage = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const query: Record<string, any> = {};
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const debounced = useDebounced({ searchQuery: searchTerm, delay: 600 });
    if (!!debounced) {
        query["searchTerm"] = searchTerm;
    }
    const { data, isLoading } = useGetAllDoctorsQuery({ ...query });
    const [deleteDoctor] = useDeleteDoctorMutation();

    const doctorsData = data?.data;
    const metaData = data?.meta;

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteDoctor(id).unwrap();
            if (res.success) {
                toast.success("Doctor Deleted Successfully");
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "contactNumber", headerName: "Contact Number", flex: 1 },
        { field: "experience", headerName: "Experience", flex: 1 },
        {
            field: "appointmentFee",
            headerName: "Appointment Fee",
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
                        <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Button onClick={() => setIsModalOpen(true)}>
                    Create New Doctor
                </Button>
                <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
                <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    label="Search Doctor"
                />
            </Stack>
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid
                        rows={doctorsData || []}
                        columns={columns || []}
                        loading={isLoading}
                    />
                </Box>
            ) : (
                <Box>Loading...</Box>
            )}
        </Box>
    );
};

export default DoctorsPage;
