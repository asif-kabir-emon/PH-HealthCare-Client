"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const validationSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Please enter a valid email"),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleLogin = async (data: FieldValues) => {
        try {
            const res = await userLogin(data);

            if (res?.data?.accessToken) {
                storeUserInfo({
                    accessToken: res.data.accessToken,
                });
                toast.success(
                    res?.data.message || "User logged in successfully"
                );
                router.push("/");
            } else {
                setError(res?.message || "User login failed");
            }
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        }
    };

    return (
        <Container>
            <Stack
                sx={{
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "600px",
                        width: "100%",
                        boxShadow: 1,
                        borderRadius: 1,
                        padding: 4,
                    }}
                >
                    <Stack
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Image
                                src={assets.svgs.logo}
                                width={50}
                                height={50}
                                alt="logo"
                            />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                Login PH HealthCare
                            </Typography>
                        </Box>
                    </Stack>
                    {error && (
                        <Box>
                            <Typography
                                sx={{
                                    backgroundColor: "red",
                                    padding: "1px",
                                    margin: "5px 0",
                                    borderRadius: "2px",
                                    color: "white",
                                }}
                            >
                                {error}
                            </Typography>
                        </Box>
                    )}
                    <Box>
                        <PHForm
                            onSubmit={handleLogin}
                            resolver={zodResolver(validationSchema)}
                            defaultValues={{
                                email: "",
                                password: "",
                            }}
                        >
                            <Grid container spacing={2} my={1}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <PHInput
                                        name="email"
                                        type="email"
                                        label="Email"
                                        fullWidth={true}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <PHInput
                                        name="password"
                                        type="password"
                                        label="Password"
                                        fullWidth={true}
                                        required={true}
                                    />
                                </Grid>
                            </Grid>
                            <Box
                                sx={{
                                    margin: "10px 0",
                                    textAlign: "right",
                                }}
                            >
                                <Link href="/login">Forget Password?</Link>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth={true}
                                sx={{
                                    margin: "10px 0",
                                }}
                            >
                                Login
                            </Button>
                            <Typography component="p" fontWeight={300}>
                                Don&apos;t have an account?{" "}
                                <Link href="/register">Create an account</Link>
                            </Typography>
                        </PHForm>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default LoginPage;
