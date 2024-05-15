"use client";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import {
    useGetDoctorQuery,
    useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { Gender } from "@/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
    params: {
        doctorId: string;
    };
};

const DoctorUpdatePage = ({ params }: TProps) => {
    const router = useRouter();
    const { data, isLoading } = useGetDoctorQuery(params?.doctorId);
    const [updateDoctor] = useUpdateDoctorMutation();
    const doctorData = data?.data;

    const handleFormSubmit = async (values: FieldValues) => {
        values.experience = Number(values.experience);
        values.appointmentFee = Number(values.appointmentFee);
        values.id = params?.doctorId;
        try {
            const res = await updateDoctor({
                id: values?.id,
                body: values,
            }).unwrap();
            console.log(res);
            if (res.success) {
                toast.success("Doctor updated successfully");
                router.push("/dashboard/admin/doctors");
            } else {
                toast.error("Failed to update doctor");
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const defaultValues = {
        name: doctorData?.name || "",
        contactNumber: doctorData?.contactNumber || "",
        address: doctorData?.address || "",
        registrationNumber: doctorData?.registrationNumber || "",
        gender: doctorData?.gender || "",
        experience: doctorData?.experience || 0,
        appointmentFee: doctorData?.appointmentFee || 0,
        qualification: doctorData?.qualification || "",
        currentWorkplace: doctorData?.currentWorkplace || "",
        designation: doctorData?.designation || "",
    };

    return (
        <Box>
            <Typography component="h5" variant="h5">
                Update Doctor Info
            </Typography>
            {!isLoading ? (
                <PHForm
                    onSubmit={handleFormSubmit}
                    defaultValues={doctorData && defaultValues}
                >
                    <Grid container spacing={2} sx={{ my: 5 }}>
                        <Grid item xs={12} sm={12} md={4}>
                            <PHInput
                                name="name"
                                label="Name"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <PHInput
                                name="contactNumber"
                                label="Contract Number"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <PHInput
                                name="address"
                                label="Address"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <PHInput
                                name="registrationNumber"
                                label="Registration Number"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <PHInput
                                name="experience"
                                type="number"
                                label="Experience"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <PHSelectField
                                items={Gender}
                                name="gender"
                                label="Gender"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <PHInput
                                name="appointmentFee"
                                type="number"
                                label="AppointmentFee"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <PHInput
                                name="qualification"
                                label="Qualification"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <PHInput
                                name="currentWorkplace"
                                label="Current Working Place"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <PHInput
                                name="designation"
                                label="Designation"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit">Update</Button>
                </PHForm>
            ) : (
                <Box my={5}>
                    <Typography>Loading...</Typography>
                </Box>
            )}
        </Box>
    );
};

export default DoctorUpdatePage;
