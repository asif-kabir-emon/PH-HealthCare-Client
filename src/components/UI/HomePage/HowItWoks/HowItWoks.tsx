import { Box, Container, Grid, Typography } from "@mui/material";
import doctorImage from "@/assets/how-it-works-img.png";
import Image from "next/image";
import assets from "@/assets";

const howItWorksData = [
    {
        icon: assets.svgs.doctorSearch,
        title: "Search Doctor",
        description: "Choose the best doctor for your treatment",
    },
    {
        icon: assets.svgs.profile,
        title: "Check Doctor Profile",
        description: "Check doctor's profile and book an appointment",
    },
    {
        icon: assets.svgs.schedule,
        title: "Schedule Appointment",
        description: "Schedule your appointment and make payment",
    },
    {
        icon: assets.svgs.solution,
        title: "Get Your Solution",
        description: "Get your solution from the best doctor",
    },
];

const HowItWoks = () => {
    return (
        <Container
            sx={{
                padding: "40px 0",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" color="primary.main">
                        How it Works
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                        4 Easy Steps to Get Your Solution
                    </Typography>
                    <Typography component="p" fontWeight={300} mt={2}>
                        Access to expert physicians and surgeons, advanced
                        technologies and top-quality surgery facilities right
                        here
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2} alignItems="flex-end">
                <Grid item md={6}>
                    <Image src={doctorImage} alt="doctor" />
                </Grid>
                <Grid item md={6}>
                    <Grid container spacing={2}>
                        {howItWorksData.map((data, index) => (
                            <Grid item key={index} xs={12} sm={12} md={6}>
                                <Box
                                    sx={{
                                        minHeight: "175px",
                                        minWidth: "100%",
                                        padding: "20px",
                                        border: "1px solid rgba(0, 0, 0, 0.1)",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <Box>
                                        <Image
                                            src={data.icon}
                                            alt={data.title}
                                        />
                                    </Box>
                                    <Typography variant="h6">
                                        {data.title}
                                    </Typography>
                                    <Typography component="p" fontWeight={300}>
                                        {data.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HowItWoks;
