import PHForm from "@/components/Forms/PHForm";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import PHDatePicker from "@/components/Forms/PHDatePicker";
import PHTimePicker from "@/components/Forms/PHTimePicker";
import dateFormatter from "@/utils/dateFormatter";
import timeFormatter from "@/utils/timeFormatter";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleModal = ({ open, setOpen }: TProps) => {
    const [createSchedule] = useCreateScheduleMutation();

    const handleFormSubmit = async (values: FieldValues) => {
        values.startDate = dateFormatter(values.startDate);
        values.endDate = dateFormatter(values.endDate);
        values.startTime = timeFormatter(values.startTime);
        values.endTime = timeFormatter(values.endTime);

        try {
            const res = await createSchedule(values).unwrap();

            if (res.success && res.data.length) {
                setOpen(false);
                toast.success("Schedule created successfully");
            } else {
                toast.error(res?.message || "Failed to create schedule");
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <PHModal open={open} setOpen={setOpen} title="Create A New Schedule">
            <PHForm onSubmit={handleFormSubmit}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: "350px",
                    }}
                >
                    <Grid item xs={12} md={12}>
                        <PHDatePicker
                            name="startDate"
                            label="Start Date"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <PHDatePicker
                            name="endDate"
                            label="End Date"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PHTimePicker
                            name="startTime"
                            label="Start Time"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PHTimePicker
                            name="endTime"
                            label="End Time"
                            required={true}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    sx={{
                        mt: 2,
                    }}
                >
                    Create Schedule
                </Button>
            </PHForm>
        </PHModal>
    );
};

export default ScheduleModal;
