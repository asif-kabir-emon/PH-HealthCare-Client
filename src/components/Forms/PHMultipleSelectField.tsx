import { MenuItem, SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITextField {
    name: string;
    size?: "small" | "medium";
    placeholder?: string;
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
    items: {
        value: string;
        label: string;
    }[];
}

const PHMultipleSelectField = ({
    items,
    name,
    label,
    size = "small",
    required,
    fullWidth = true,
    sx,
}: ITextField) => {
    const { control, formState } = useFormContext();
    const isError = formState.errors[name] !== undefined;
    const isDisabled = items?.length === 0 ? true : false;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    {...field}
                    sx={{
                        ...sx,
                    }}
                    size={size}
                    select
                    label={label}
                    required={required}
                    fullWidth={fullWidth}
                    error={isError}
                    helperText={
                        isDisabled
                            ? "No options available"
                            : isError
                            ? (formState.errors[name]?.message as string)
                            : ""
                    }
                    SelectProps={{
                        multiple: true,
                        value: field.value || [],
                        onChange: (event) => {
                            field.onChange(event.target.value);
                        },
                    }}
                    disabled={isDisabled}
                >
                    {items?.map((item, index) => (
                        <MenuItem key={index} value={item?.value}>
                            {item?.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
};

export default PHMultipleSelectField;
