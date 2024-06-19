"use client";
import VideoCall from "@/components/UI/VideoCall/VideoCall";
import { Container } from "@mui/material";
import React from "react";

type TProps = {
    searchParams: {
        videoCallingId: string;
    };
};

const VideoPage = ({ searchParams }: TProps) => {
    const videoCallingId = searchParams.videoCallingId;
    console.log(videoCallingId);

    return (
        <Container>
            <VideoCall videoCallingId={videoCallingId} />
        </Container>
    );
};

export default VideoPage;
