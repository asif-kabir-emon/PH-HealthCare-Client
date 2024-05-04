"use server";

export const registerPatient = async (formDta: FormData) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/create-patient`,
        {
            method: "POST",
            body: formDta,
            cache: "no-store",
        }
    );

    const patientInfo = await res.json();

    return patientInfo;
};
