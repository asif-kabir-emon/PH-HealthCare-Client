"use client";
import useUserInfo from "@/hooks/useUserInfo";
import logoutUser from "@/services/actions/logoutUser";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const userInfo = useUserInfo();
    const router = useRouter();

    const handleLogout = () => {
        logoutUser(router);
    };

    return (
        <Box
            sx={{
                bgcolor: "primary.main",
            }}
        >
            <Container>
                <Stack
                    py={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="h4"
                        component={Link}
                        href="/"
                        fontWeight={600}
                    >
                        P
                        <Box component="span" color="white">
                            H
                        </Box>{" "}
                        Health Care
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        gap={4}
                        color={"white"}
                    >
                        <Typography
                            component={Link}
                            href="/consultation"
                            color="white"
                        >
                            Consultation
                        </Typography>
                        <Typography
                            component={Link}
                            href="/login"
                            color="white"
                        >
                            Health Plans
                        </Typography>
                        <Typography
                            component={Link}
                            href="/login"
                            color="white"
                        >
                            Medicine
                        </Typography>
                        <Typography
                            component={Link}
                            href="/login"
                            color="white"
                        >
                            Diagnostics
                        </Typography>
                        <Typography
                            component={Link}
                            href="/login"
                            color="white"
                        >
                            NGOs
                        </Typography>
                        {userInfo && userInfo.id && (
                            <Typography
                                component={Link}
                                href="/dashboard"
                                color="white"
                            >
                                Dashboard
                            </Typography>
                        )}
                    </Stack>
                    {userInfo && userInfo.id ? (
                        <Button
                            onClick={() => {
                                handleLogout();
                            }}
                            color="error"
                            sx={{
                                boxShadow: "none",
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            component={Link}
                            href="/login"
                            sx={{
                                boxShadow: "none",
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default Navbar;
