"use client";
import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import CheckIcon from "@mui/icons-material/Check";

export const validationSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Please enter a valid email"),
});

const ForgetPasswordPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [forgetPassword, { isSuccess }] = useForgotPasswordMutation();

    const handleLogin = async (values: FieldValues) => {
        try {
            const res = await forgetPassword(values).unwrap();

            if (res?.success) {
                toast.success("Check your email for the password reset link.");
            } else {
                throw new Error(res?.message || "Something is wrong.");
            }
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message || "User login failed");
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
                                Forget Password
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
                        {isSuccess && (
                            <Alert
                                icon={<CheckIcon fontSize="inherit" />}
                                severity="success"
                                sx={{
                                    my: 2,
                                }}
                            >
                                An email with reset password link has been sent
                                to your email.
                            </Alert>
                        )}
                        {!isSuccess && (
                            <PHForm
                                onSubmit={handleLogin}
                                resolver={zodResolver(validationSchema)}
                                defaultValues={{
                                    email: "",
                                    password: "",
                                }}
                            >
                                <Grid container spacing={2} my={1}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <PHInput
                                            name="email"
                                            type="email"
                                            label="Email"
                                            fullWidth={true}
                                            required={true}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth={true}
                                    sx={{
                                        margin: "10px 0",
                                    }}
                                >
                                    Forget Password
                                </Button>
                            </PHForm>
                        )}
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default ForgetPasswordPage;
