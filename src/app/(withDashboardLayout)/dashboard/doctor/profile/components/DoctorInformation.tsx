import { theme } from "@/lib/theme/theme";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const StyledInformationBox = styled(Box)({
    background: "#f4f7fe",
    borderRadius: theme.spacing(1),
    width: "45%",
    padding: "8px 16px",
    "& p": {
        fontWeight: "600",
    },
    "& sm": {
        width: "100%",
    },
});

const DoctorInformation = ({ doctorInfo }: any) => {
    return (
        <>
            <Box mb={5}>
                <Typography variant="h5" mb={2} color="primary.main">
                    Personal Information
                </Typography>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    flexWrap={{ xs: "nowrap", sm: "wrap" }}
                    gap={2}
                >
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Role
                        </Typography>
                        <Typography>Doctor</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Name
                        </Typography>
                        <Typography>{doctorInfo?.name}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Email
                        </Typography>
                        <Typography>{doctorInfo?.email}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Gender
                        </Typography>
                        <Typography>{doctorInfo?.gender}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Gender
                        </Typography>
                        <Typography>{doctorInfo?.designation}</Typography>
                    </StyledInformationBox>
                </Stack>
            </Box>
            <Box mb={5}>
                <Typography variant="h5" mb={2} color="primary.main">
                    Professional Information
                </Typography>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    flexWrap={{ xs: "nowrap", sm: "wrap" }}
                    gap={2}
                >
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Appointment Fee
                        </Typography>
                        <Typography>{doctorInfo?.appointmentFee}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Qualification
                        </Typography>
                        <Typography>{doctorInfo?.qualification}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Current Working Place
                        </Typography>
                        <Typography>{doctorInfo?.currentWorkplace}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Joined
                        </Typography>
                        <Typography>{doctorInfo?.createdAt}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Current Status
                        </Typography>
                        <Typography>
                            {doctorInfo?.isDeleted ? "Inactive" : "Active"}
                        </Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Average Rating
                        </Typography>
                        <Typography>{doctorInfo?.averageRating}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Experience
                        </Typography>
                        <Typography>{doctorInfo?.experience}</Typography>
                    </StyledInformationBox>
                </Stack>
            </Box>
        </>
    );
};

export default DoctorInformation;
