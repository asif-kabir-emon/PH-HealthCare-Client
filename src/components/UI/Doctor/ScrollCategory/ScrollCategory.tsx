"use client";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type TProps = {
    specialty: string;
};

const ScrollCategory = ({ specialty }: TProps) => {
    const router = useRouter();
    const { data } = useGetAllSpecialtiesQuery({});
    const specialties = data?.data;

    const [value, setValue] = React.useState(specialty || "");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        router.push(`/doctors?specialty=${newValue}`);
    };

    return (
        <Box
            sx={{
                maxWidth: "100%",
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {specialties?.map((specialty: any) => (
                    <Tab
                        key={specialty.id}
                        label={specialty.title}
                        value={specialty.title}
                        sx={{
                            fontWeight: 600,
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default ScrollCategory;
