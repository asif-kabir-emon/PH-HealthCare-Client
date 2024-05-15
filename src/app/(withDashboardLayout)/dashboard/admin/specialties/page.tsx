"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import SpecialtyModal from "./components/SpecialtyModal";
import {
    useDeleteSpecialtyMutation,
    useGetAllSpecialtiesQuery,
} from "@/redux/api/specialtiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

const SpecialtiesPage = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const { data, isLoading } = useGetAllSpecialtiesQuery({});
    const [deleteSpecialty] = useDeleteSpecialtyMutation();

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteSpecialty(id).unwrap();
            if (res?.success) {
                toast.success("Specialty deleted successfully");
            } else {
                toast.error("Failed to delete specialty");
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const columns: GridColDef[] = [
        {
            field: "icon",
            headerName: "Icon",
            flex: 1,
            headerAlign: "center",
            renderCell: ({ row }) => {
                return (
                    <Box my={2}>
                        {row?.icon && (
                            <Image
                                src={row.icon}
                                width={30}
                                height={30}
                                alt={row.title}
                            />
                        )}
                    </Box>
                );
            },
        },
        { field: "title", headerName: "Title", flex: 1 },
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
                            handleDelete(row.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
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
                    Create Specialty
                </Button>
                <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} />
                <TextField size="small" label="Search Specialty" />
            </Stack>
            <Box my={2}>
                {!isLoading ? (
                    <Box>
                        <DataGrid
                            rows={data?.data || []}
                            columns={columns || []}
                            hideFooter={true}
                        />
                    </Box>
                ) : (
                    <Box>Loading...</Box>
                )}
            </Box>
        </Box>
    );
};

export default SpecialtiesPage;
