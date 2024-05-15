import PHFileUpload from "@/components/Forms/PHFileUploader";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: TProps) => {
    const [createSpecialty] = useCreateSpecialtyMutation();
    const handleFormSubmit = async (values: FieldValues) => {
        const data = modifyPayload(values);

        try {
            const res = await createSpecialty(data).unwrap();
            console.log(res);

            if (res?.success) {
                toast.success("Specialty created successfully");
                setOpen(false);
            } else {
                toast.error("Failed to create specialty");
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <PHModal open={open} setOpen={setOpen} title="Create A New Specialty">
            <PHForm onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <PHInput name="title" label="Title" />
                    </Grid>
                    <Grid item md={6}>
                        <PHFileUpload name="file" label="Upload File" />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    sx={{
                        mt: 1,
                    }}
                >
                    Create
                </Button>
            </PHForm>
        </PHModal>
    );
};

export default SpecialtyModal;
