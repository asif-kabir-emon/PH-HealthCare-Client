export type TDoctor = {
    id: number;
    name: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number | null | undefined;
    gender: "MALE" | "FEMALE";
    appointmentFee: number | null | undefined;
    qualification: string;
    currentWorkplace: string;
    designation: string;
    doctorSpecialities?: TSpecialties[];
};

export type TSpecialties = {
    specialityId: string;
    doctorId: string;
    specialities: {
        id: string;
        title: string;
        icon?: string;
    };
};
