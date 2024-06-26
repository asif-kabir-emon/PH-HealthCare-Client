import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Specialist = async () => {
    const res = await fetch(
        "https://ph-health-care-server-seven.vercel.app/api/v1/Specialities",
        {
            next: {
                revalidate: 60,
            },
        }
    );
    const { data: specialities } = await res.json();

    return (
        <Container>
            <Box
                sx={{
                    margin: "40px 0",
                    textAlign: "center",
                }}
            >
                <Box
                    sx={{
                        textAlign: "start",
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        Explore Treatments Across Specialities
                    </Typography>
                    <Typography component="p" fontWeight={400}>
                        Experienced Doctors Across All Specialities
                    </Typography>
                </Box>
                <Stack direction="row" gap={4} mt={4}>
                    {specialities.slice(0, 6).map((speciality: any) => (
                        <Box
                            key={speciality.id}
                            sx={{
                                flex: 1,
                                width: "150px",
                                backgroundColor: "rgba(245, 245, 245, 1)",
                                border: "1px solid rgba(250, 250, 250, 1)",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "40px 10px",

                                "& img": {
                                    width: "50px",
                                    height: "50px",
                                    margin: "0 auto",
                                },

                                "&:hover": {
                                    border: "1px solid blue",
                                    padding: "40px 10px",
                                },
                            }}
                            component={Link}
                            href={`/doctors?specialty=${speciality.title}`}
                        >
                            <Image
                                src={speciality.icon}
                                width={100}
                                height={100}
                                alt="speciality icon"
                            />
                            <Box>
                                <Typography
                                    component="p"
                                    fontWeight={600}
                                    fontSize={18}
                                    mt={2}
                                >
                                    {speciality.title}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
                <Button
                    variant="outlined"
                    sx={{
                        marginTop: "20px",
                    }}
                >
                    View All
                </Button>
            </Box>
        </Container>
    );
};

export default Specialist;
