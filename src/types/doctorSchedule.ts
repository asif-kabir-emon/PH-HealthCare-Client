export type DoctorSchedule = {
    doctorId: string;
    scheduleId: string;
    isBooked: boolean;
    createdAt: string;
    updatedAt: string;
    appointmentId: string | null;
    doctor: Doctor;
    schedule: Schedule;
};

type Doctor = {
    id: string;
    email: string;
    name: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: string;
    appointmentFee: number;
    qualification: string;
    currentWorkplace: string;
    designation: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    averageRating: number;
};

type Schedule = {
    id: string;
    startDateTime: string;
    endDateTime: string;
    createdAt: string;
    updatedAt: string;
};
