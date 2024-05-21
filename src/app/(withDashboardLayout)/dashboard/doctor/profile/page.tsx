"use client";
import {
    useGetMyProfileQuery,
    useUpdateMyProfileMutation,
} from "@/redux/api/myProfileApi";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import React, { useState } from "react";
import DoctorInformation from "./components/DoctorInformation";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DoctorInformationModal from "./components/DoctorInformationModal";

const ProfilePage = () => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetMyProfileQuery({});
    const [updateMyProfile, { isLoading: updating }] =
        useUpdateMyProfileMutation();
    const doctorInfo = data?.data;
    console.log(doctorInfo);

    const fileUploadHandler = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify({}));

        try {
            const res = await updateMyProfile(formData).unwrap();
            console.log(res);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid md={4}>
                    <Box
                        sx={{
                            height: "auto",
                            width: "100%",
                            overflow: "hidden",
                            borderRadius: "10px",
                        }}
                    >
                        <Image
                            src={doctorInfo?.profilePhoto}
                            height={300}
                            width={400}
                            alt="Profile Photo"
                        />
                    </Box>
                    {updating ? (
                        <Typography>Uploading...</Typography>
                    ) : (
                        <AutoFileUploader
                            name="file"
                            label="Choose your profile photo"
                            icon={<CloudUploadIcon />}
                            onFileUpload={fileUploadHandler}
                            variant="text"
                            sx={{
                                my: 2,
                                width: "100%",
                                backgroundColor: "#f4f7fe",
                            }}
                        />
                    )}
                    <Button
                        onClick={() => setIsModelOpen(true)}
                        endIcon={<ModeEditIcon />}
                        fullWidth
                    >
                        Update Modal
                    </Button>
                    <DoctorInformationModal
                        open={isModelOpen}
                        setOpen={setIsModelOpen}
                        doctorId={doctorInfo?.id}
                    />
                </Grid>
                <Grid md={8}>
                    <DoctorInformation doctorInfo={doctorInfo} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
