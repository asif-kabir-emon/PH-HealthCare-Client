import { SxProps } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
    name: string;
    label?: string;
    size?: "small" | "medium";
    fullWidth?: boolean;
    required?: boolean;
    sx?: SxProps;
};

const PHTimePicker = ({
    name,
    label,
    size = "small",
    fullWidth = true,
    required = false,
    sx,
}: TProps) => {
    const { control, formState } = useFormContext();
    const isError = formState.errors[name] !== undefined;

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={dayjs(new Date().toDateString())}
            render={({ field: { onChange, value, ...field } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        {...field}
                        timezone="system"
                        label={label}
                        onChange={(time) => onChange(time)}
                        value={value || (Date.now() as any)}
                        slotProps={{
                            textField: {
                                required: required,
                                size: size,
                                sx: { ...sx },
                                variant: "outlined",
                                fullWidth: fullWidth,
                            },
                        }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default PHTimePicker;
