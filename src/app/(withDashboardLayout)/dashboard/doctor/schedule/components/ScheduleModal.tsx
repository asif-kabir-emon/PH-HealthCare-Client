import PHDatePicker from "@/components/Forms/PHDatePicker";
import PHForm from "@/components/Forms/PHForm";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import PHMultipleSelectField from "@/components/Forms/PHMultipleSelectField";
import { Button, Grid } from "@mui/material";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorScheduleApi";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

dayjs.extend(utc);
dayjs.extend(timezone);

const ScheduleModal = ({ open, setOpen }: TProps) => {
    const [selectedDate, setSelectedDate] = useState(
        dayjs(new Date()).toISOString()
    );

    const query: Record<string, any> = {};
    if (!!selectedDate) {
        query["startDateTime"] = dayjs(selectedDate)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toISOString();
        query["endDateTime"] = dayjs(selectedDate)
            .hour(23)
            .minute(59)
            .second(59)
            .millisecond(999)
            .toISOString();
    }

    const { data, isLoading } = useGetAllSchedulesQuery(query);
    const [createDoctorSchedule] = useCreateDoctorScheduleMutation();
    const schedules = data?.data?.schedules;

    const handleFormSubmit = async (values: FieldValues) => {
        console.log(values);
        try {
            const res = await createDoctorSchedule(values).unwrap();
            console.log(res);
            if (res.success) {
                toast.success("Doctor schedule created successfully");
                setOpen(false);
            } else {
                toast.error("Doctor schedule creation failed");
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <PHModal open={open} setOpen={setOpen} title="Create Doctor Schedule">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Schedule Date"
                    value={dayjs(selectedDate)}
                    onChange={(newValue) =>
                        setSelectedDate((newValue as Dayjs).toISOString())
                    }
                    disablePast
                    sx={{ width: "100%" }}
                />
            </LocalizationProvider>
            <PHForm onSubmit={handleFormSubmit}>
                <Grid
                    container
                    spacing={2}
                    my={1}
                    sx={{
                        width: "350px",
                    }}
                >
                    <Grid item xs={12}>
                        <PHMultipleSelectField
                            name="scheduleIds"
                            label="Select Schedules"
                            items={schedules?.map((schedule: any) => ({
                                label: `${dayjs
                                    .utc(schedule?.startDateTime)
                                    .local()
                                    .format("hh:mm A")} - ${dayjs
                                    .utc(schedule?.endDateTime)
                                    .local()
                                    .format("hh:mm A")}`,
                                value: schedule?.id,
                            }))}
                            required
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth disabled={!schedules?.length}>
                    Create Schedule
                </Button>
            </PHForm>
        </PHModal>
    );
};

export default ScheduleModal;
