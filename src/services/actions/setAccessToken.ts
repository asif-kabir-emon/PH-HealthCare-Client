"use server";
import { authKey } from "@/constants/authKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessToken = (accessToken: string, option?: any) => {
    cookies().set(authKey, accessToken);

    if (option && option.passwordChangeRequired) {
        redirect("/dashboard/change-password");
    }
    if (option && !option.passwordChangeRequired && option.redirect) {
        redirect(option.redirect);
    }
};

export default setAccessToken;
