import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const TopRatedDoctors = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctor?page=1&limit=3`,
        {
            next: {
                revalidate: 60,
            },
        }
    );
    const { data: doctors } = await res.json();

    return (
        <Box
            sx={{
                my: 10,
                py: 30,
                backgroundColor: "rgba(20, 20, 20, 0.1)",
                clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
            }}
        >
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" component="h1" fontWeight={700}>
                    Our Top Rated Doctors
                </Typography>
                <Typography
                    component="p"
                    fontSize={18}
                    fontWeight={400}
                    sx={{ mt: 2 }}
                >
                    Access to expert physicians and surgeons, advanced
                    technologies
                </Typography>
                <Typography component="p" fontSize={18} fontWeight={400}>
                    and top-quality surgery facilities right here.
                </Typography>
            </Box>
            <Container sx={{ my: 10 }}>
                <Grid container spacing={4}>
                    {doctors?.map((doctor: any) => (
                        <Grid item key={doctor.id} md={4}>
                            <Card>
                                {/* <CardMedia
                                    sx={{ height: 200 }}
                                    image={doctor.profilePhoto}
                                    title="green iguana"
                                /> */}
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        height: 200,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        src={doctor.profilePhoto}
                                        width={500}
                                        height={200}
                                        objectFit="cover"
                                        alt="Doctor"
                                    />
                                </Box>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {doctor.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {doctor.qualification},{" "}
                                        {doctor.designation}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        mt={1}
                                    >
                                        <LocationOnIcon /> {doctor.address}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    ></Typography>
                                </CardContent>
                                <CardActions
                                    sx={{
                                        justifyContent: "space-between",
                                        px: 2,
                                    }}
                                >
                                    <Button>Book Now</Button>
                                    <Button variant="outlined">
                                        View Profile
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box textAlign="center">
                    <Button
                        variant="outlined"
                        component={Link}
                        href="/doctors"
                        sx={{
                            marginTop: "20px",
                        }}
                    >
                        View All Doctors
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default TopRatedDoctors;
