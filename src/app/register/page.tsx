"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const validationSchema = z.object({
    patient: z.object({
        name: z
            .string({
                required_error: "Name is required",
            })
            .min(3, "Name must be at least 3 characters"),
        email: z
            .string({
                required_error: "Email is required",
            })
            .email("Please enter a valid email"),
        contactNumber: z
            .string({
                required_error: "Contact number is required",
            })
            .regex(/^01\d{9}$/, "Please Provide a valid contact number"),
        address: z
            .string({
                required_error: "Address is required",
            })
            .min(1, "Please enter your address"),
    }),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(6, "Password must be at least 6 characters"),
});

export const defaultValues = {
    patient: {
        name: "",
        email: "",
        contactNumber: "",
        address: "",
    },
    password: "",
};

const RegisterPage = () => {
    const router = useRouter();

    const handleRegister = async (values: FieldValues) => {
        const data = modifyPayload(values);

        try {
            const res = await registerPatient(data);

            if (res?.success) {
                const userResponse = await userLogin({
                    email: values.patient.email,
                    password: values.password,
                });

                if (userResponse?.data?.accessToken) {
                    storeUserInfo({
                        accessToken: userResponse.data.accessToken,
                    });

                    toast.success(
                        userResponse?.data.message ||
                            "User logged in successfully"
                    );

                    router.push("/");
                } else {
                    toast.error(
                        userResponse?.data.message || "Failed to login"
                    );
                }
            } else {
                toast.error(res?.data.message || "Something went wrong");
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
                                Patient Register{" "}
                            </Typography>
                        </Box>
                    </Stack>
                    <Box>
                        <PHForm
                            onSubmit={handleRegister}
                            resolver={zodResolver(validationSchema)}
                            defaultValues={defaultValues}
                        >
                            <Grid container spacing={2} my={1}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <PHInput
                                        name="patient.name"
                                        type="text"
                                        label="Name"
                                        fullWidth={true}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <PHInput
                                        name="patient.email"
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
                                <Grid item xs={12} sm={12} md={6}>
                                    <PHInput
                                        name="patient.contactNumber"
                                        type="tel"
                                        label="Contact Number"
                                        fullWidth={true}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <PHInput
                                        name="patient.address"
                                        type="text"
                                        label="Address"
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
                                Register
                            </Button>
                            <Typography component="p" fontWeight={300}>
                                Do you have an account?{" "}
                                <Link href="/login">Login</Link>
                            </Typography>
                        </PHForm>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default RegisterPage;
