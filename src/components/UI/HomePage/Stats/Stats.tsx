import { Container, Grid, Typography } from "@mui/material";

const statisticsData = [
    {
        title: "180+",
        description: "Expert Doctors",
    },
    {
        title: "26+",
        description: "Expert Services",
    },
    {
        title: "10K+",
        description: "Appointments",
    },
    {
        title: "150+",
        description: "Hospitals",
    },
];

const Stats = () => {
    return (
        <Container>
            <Grid
                container
                my={5}
                justifyContent="center"
                sx={{
                    padding: "30px",
                    borderRadius: "10px",
                    backgroundImage: "linear-gradient(45deg,blue, cyan)",
                }}
            >
                {statisticsData.map((data, index) => (
                    <Grid
                        item
                        key={index}
                        xs={12}
                        sm={12}
                        md={3}
                        textAlign="center"
                        sx={{
                            margin: "20px 0",
                        }}
                    >
                        <Typography variant="h3" color="white">
                            {data.title}
                        </Typography>
                        <Typography
                            component="p"
                            fontWeight={300}
                            color="white"
                        >
                            {data.description}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Stats;
