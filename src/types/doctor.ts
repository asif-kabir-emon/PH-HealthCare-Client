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
    specialities?: TSpecialties[];
};

export type TSpecialties = {
    specialityId: string;
    isDeleted: boolean;
};
