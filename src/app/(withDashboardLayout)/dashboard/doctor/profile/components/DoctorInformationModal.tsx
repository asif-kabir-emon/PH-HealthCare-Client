import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHMultipleSelectField from "@/components/Forms/PHMultipleSelectField";
import PHSelectField from "@/components/Forms/PHSelectField";
import PHFullScreenModal from "@/components/Shared/PHModal/PHFullScreenModal";
import {
    useGetDoctorQuery,
    useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { Gender } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues, set } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    doctorId: string;
};

const validationSchema = z.object({
    experience: z.preprocess(
        (x) => (x ? x : undefined),
        z.coerce.number().int().optional()
    ),
    appointmentFee: z.preprocess(
        (x) => (x ? x : undefined),
        z.coerce.number().int().optional()
    ),
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    gender: z.string().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
    specialities: z.array(z.string()).optional(),
});

const DoctorInformationModal = ({ open, setOpen, doctorId }: TProps) => {
    console.log(doctorId);
    const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);
    const {
        data: doctorData,
        refetch,
        isSuccess,
    } = useGetDoctorQuery(doctorId);
    const { data: SpecialtyData, isLoading: loadingSpecialty } =
        useGetAllSpecialtiesQuery({});
    const [updateDoctor, { isLoading: updatingDoctorData }] =
        useUpdateDoctorMutation();

    const doctorInfo = doctorData?.data;
    const specialtiesList = SpecialtyData?.data;

    useEffect(() => {
        if (!isSuccess) {
            return;
        }
        setSelectedSpecialtiesIds(
            doctorInfo?.doctorSpecialities?.map((sp: any) => {
                return sp?.specialities?.id;
            })
        );
    }, [isSuccess, doctorInfo]);

    console.log(doctorInfo);

    console.log(selectedSpecialtiesIds);

    const onSubmitHandler = async (values: FieldValues) => {
        const specialties = values?.specialities?.map(
            (specialitiesId: string) => ({
                specialitiesId,
                isDeleted: false,
            })
        );

        const excludedFields: Array<keyof typeof values> = [
            "email",
            "id",
            "role",
            "needPasswordChange",
            "status",
            "createdAt",
            "updatedAt",
            "isDeleted",
            "averageRating",
            "review",
            "profilePhoto",
            "registrationNumber",
            "schedules",
            "doctorSpecialties",
        ];

        const updatedValues = Object.fromEntries(
            Object.entries(values).filter(([key]) => {
                return !excludedFields.includes(key);
            })
        );

        updatedValues.specialities = specialties;
        console.log(updatedValues);

        try {
            const res = await updateDoctor({
                id: doctorInfo?.id,
                body: updatedValues,
            }).unwrap();
            console.log(res);

            if (res?.success) {
                setOpen(false);
                refetch();
                toast.success("Doctor information updated successfully");
            } else {
                toast.error("Doctor information update failed");
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
            <PHForm
                onSubmit={onSubmitHandler}
                defaultValues={{
                    ...doctorInfo,
                    specialities: selectedSpecialtiesIds,
                }}
                resolver={zodResolver(validationSchema)}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput name="name" label="Name" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput name="email" label="Email" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput name="contactNumber" label="Contact Number" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput name="address" label="Address" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput
                            name="registrationNumber"
                            label="Registration Number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput name="experience" label="Experience" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHSelectField
                            name="gender"
                            label="Gender"
                            items={Gender}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput
                            name="appointmentFee"
                            label="Appointment Fee"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput name="qualification" label="Qualification" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput
                            name="currentWorkplace"
                            label="Current Working Place"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHInput name="designation" label="Designation" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PHMultipleSelectField
                            name="specialities"
                            label="Specialities"
                            items={specialtiesList?.map((specialty: any) => ({
                                label: specialty?.title,
                                value: specialty?.id,
                            }))}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    disabled={updatingDoctorData}
                    sx={{
                        mt: 2,
                    }}
                >
                    Save
                </Button>
            </PHForm>
        </PHFullScreenModal>
    );
};

export default DoctorInformationModal;
