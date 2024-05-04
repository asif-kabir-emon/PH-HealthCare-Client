import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HowItWoks from "@/components/UI/HomePage/HowItWoks/HowItWoks";
import Specialist from "@/components/UI/HomePage/Specialist/Specialist";
import Stats from "@/components/UI/HomePage/Stats/Stats";
import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";
import React from "react";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Specialist />
            <TopRatedDoctors />
            <WhyUs />
            <HowItWoks />
            <Stats />
        </>
    );
};

export default HomePage;
