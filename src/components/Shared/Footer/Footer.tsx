import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import faceBookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import linkedInIcon from "@/assets/landing_page/linkedin.png";

const Footer = () => {
    return (
        <Box bgcolor="rgb(17,26,34)" py={5}>
            <Container>
                <Stack direction="row" justifyContent="center" gap={4}>
                    <Typography
                        component={Link}
                        href="/consultation"
                        color="rgb(255,255,255)"
                    >
                        Consultation
                    </Typography>
                    <Typography
                        component={Link}
                        href="/login"
                        color="rgb(255,255,255)"
                    >
                        Health Plans
                    </Typography>
                    <Typography
                        component={Link}
                        href="/login"
                        color="rgb(255,255,255)"
                    >
                        Medicine
                    </Typography>
                    <Typography
                        component={Link}
                        href="/login"
                        color="rgb(255,255,255)"
                    >
                        Diagnostics
                    </Typography>
                    <Typography
                        component={Link}
                        href="/login"
                        color="rgb(255,255,255)"
                    >
                        NGOs
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="center" gap={2} py={3}>
                    <Link href="https://www.facebook.com/" target="_blank">
                        <Image
                            src={faceBookIcon}
                            width={30}
                            height={30}
                            alt="Facebook"
                        />
                    </Link>
                    <Link href="https://www.instagram.com/" target="_blank">
                        <Image
                            src={instagramIcon}
                            width={30}
                            height={30}
                            alt="Facebook"
                        />
                    </Link>
                    <Link href="https://twitter.com/" target="_blank">
                        <Image
                            src={twitterIcon}
                            width={30}
                            height={30}
                            alt="Facebook"
                        />
                    </Link>
                    <Link href="https://www.linkedin.com/" target="_blank">
                        <Image
                            src={linkedInIcon}
                            width={30}
                            height={30}
                            alt="Facebook"
                        />
                    </Link>
                </Stack>
                <Box
                    sx={{
                        border: "1px dashed lightgray",
                    }}
                ></Box>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                    py={3}
                >
                    <Typography component="p" color="rgb(255,255,255)">
                        &copy;2024 PH Health Care. All rights reserved.
                    </Typography>
                    <Typography
                        variant="h4"
                        component={Link}
                        href="/"
                        fontWeight={600}
                        color="rgb(255,255,255)"
                    >
                        P
                        <Box component="span" color="primary.main">
                            H
                        </Box>{" "}
                        Health Care
                    </Typography>
                    <Typography component="p" color="rgb(255,255,255)">
                        Privacy Policy | Terms & Conditions
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
