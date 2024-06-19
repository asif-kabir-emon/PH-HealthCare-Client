import DashedLine from "@/components/UI/Doctor/DashedLine/DashedLine";
import DoctorCard from "@/components/UI/Doctor/DoctorCard/DoctorCard";
import ScrollCategory from "@/components/UI/Doctor/ScrollCategory/ScrollCategory";
import { TDoctor } from "@/types/doctor";
import { Box, Container } from "@mui/material";
import React from "react";

type TProps = {
    searchParams: {
        specialty: string;
    };
};

const DoctorsPage = async ({ searchParams }: TProps) => {
    let res;
    if (searchParams.specialty) {
        console.log(searchParams.specialty);
        res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/doctor?specialities=${searchParams.specialty}`
        );
        console.log(res);
    } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor`);
    }

    const { data } = await res.json();
    console.log(data);

    return (
        <Container>
            <ScrollCategory specialty={searchParams.specialty} />
            <DashedLine />
            <Box
                sx={{
                    mt: 2,
                    p: 3,
                    bgcolor: "secondary.light",
                }}
            >
                {data?.map((doctor: TDoctor, index: number) => (
                    <Box key={doctor.id}>
                        <DoctorCard doctor={doctor} />
                        {index !== data.length - 1 && <DashedLine />}
                    </Box>
                ))}
                {data?.length === 0 && (
                    <Box sx={{ textAlign: "center" }}>
                        <h1>No doctors found</h1>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default DoctorsPage;
